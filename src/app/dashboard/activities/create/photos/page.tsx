"use client";

import { ArrowLeft, ArrowLeftIcon, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, use, useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from "react-beautiful-dnd";
import toast from "react-hot-toast";

import {
  deleteActivityPhoto,
  getActivity,
  getActivityPhotos,
  createActivityPhoto,
  updateActivityPhoto,
} from "#/app/activities/services";
import { Activity, ActivityPhoto } from "#/app/activities/types";
import { deletePhoto } from "#/app/cloudinary/services";
import { revalidate } from "#/app/revalidate/services";
import { ActivityStepper } from "#/components/ActivityStepper";
import { CreateImageButton } from "#/components/CreateImageButton";
import { Photo } from "#/components/Photo";
import { Button } from "#/components/ui/button";
import { Typography } from "#/components/ui/typography";
import { CloudinaryResult, CloudinaryWidget } from "#/types";
import { cn } from "#/utils";

const reorder = (list: ActivityPhoto[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => ({ ...item, index }));
};

function PhotoRendered({
  photo,
  photos,
  setPhotos,
}: {
  photo: ActivityPhoto;
  photos: ActivityPhoto[];
  setPhotos: Dispatch<SetStateAction<ActivityPhoto[]>>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePhoto = async (photoId: number, path: string) => {
    setIsDeleting(true);
    await deleteActivityPhoto(photoId);
    await deletePhoto(path);
    const newPhotos = photos.filter((photo) => photo.id !== photoId);
    setPhotos(newPhotos);
    setIsDeleting(false);
  };

  return (
    <div key={photo.id} className="relative">
      <Photo
        path={photo.path}
        alt={photo.alt}
        width={500}
        height={250}
        className="mb-4 w-full overflow-hidden rounded-xl"
      />
      <div className="absolute right-4 top-4">
        <Button
          variant="destructive"
          size="sm"
          className="rounded-full"
          onClick={() => handleDeletePhoto(photo.id, photo.path)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}

interface Props {
  searchParams: {
    slug: string | undefined;
  };
}
export default function Page({ searchParams }: Props) {
  const { slug } = searchParams;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [photos, setPhotos] = useState<ActivityPhoto[]>([]);
  const [cloudinary, setCloudinary] = useState<CloudinaryWidget>();

  const router = useRouter();
  const { replace } = router;

  useEffect(() => {
    async function load() {
      const activity = await getActivity({ slug });
      setActivity(activity);

      const photos = await getActivityPhotos({ activityId: activity?.id });
      setPhotos(photos);
    }

    load();
  }, [slug]);

  useEffect(() => {
    const cloudinaryOptions = {
      cloudName: "da3uyv9xp",
      uploadPreset: "xfq6u64u",
      cropping: true,
      // croppingAspectRatio: 2,
      defaultSource: "url",
      multiple: true,
      showSkipCropButton: true,
      croppingShowDimensions: true,
      sources: ["local", "url"],
    };
    const cloudinaryCallback = async (error: Error | null, result: CloudinaryResult) => {
      if (!error && result && result.event === "success" && activity) {
        const currentPhoto = await createActivityPhoto({
          activity_id: activity.id,
          path: result.info.path,
          alt: `${activity.title} en Banos Ecuador`,
        });
        if (currentPhoto) setPhotos((photos) => [currentPhoto, ...photos]);
      }
    };

    if (!window.cloudinary) {
      toast.error("Cloundinary no esta cargado.");
    }

    if (window.cloudinary) {
      const cloudinaryLoad = window.cloudinary.createUploadWidget(
        cloudinaryOptions,
        cloudinaryCallback,
      );

      setCloudinary(cloudinaryLoad);
    }
  }, [activity]);

  const onLoadPictures = () => {
    cloudinary?.open();
  };

  const handleIaPhoto = async (url: string) => {
    cloudinary?.open(null, { files: [url] });
  };

  const handleNext = async () => {
    await revalidate(`/activities`);
    await revalidate(`/activities/${activity?.slug}`);
    await revalidate(`/dashboard/activities`);
    replace(`/dashboard/activities/create/details?slug=${activity?.slug}`);
  };

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      if (!result.destination) return;
      const items = reorder(photos, result.source.index, result.destination.index);
      setPhotos(items);
      await updateActivityPhoto(items);
    },
    [photos],
  );

  return (
    <>
      <main className="container mx-auto my-16 max-w-6xl">
        <div className="mb-8 flex justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
          <Button variant="ghost" onClick={() => replace("/dashboard/activities")}>
            <ArrowLeftIcon className="mr-1 h-4 w-4" />
            Regresar
          </Button>
        </div>
        <section className="flex gap-20">
          <ActivityStepper step={2} />
          <div className="w-full">
            <Typography variant="h2" className="mb-8">
              Fotos
            </Typography>
            <div className="mb-4 flex items-center justify-end">
              <CreateImageButton
                prompt={`Crea una imagen con esta description:\n${activity?.title}\n\n${activity?.body}`}
                onCreate={handleIaPhoto}
                disabled={!activity?.description}
              />
            </div>
            <div
              className="mb-8 flex h-[200px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-all hover:bg-slate-50"
              onClick={onLoadPictures}
            >
              <Typography variant="h5">Subir fotos</Typography>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="mb-8 flex overflow-auto"
                  >
                    {photos.map((photo, index) => (
                      <Draggable key={photo.path} draggableId={photo.path} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Image
                              src={photo.path}
                              alt={photo.alt}
                              width={300}
                              height={300}
                              className="aspect-square object-cover"
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* <div className="gap-4">
              {photos.map((photo) => (
                <PhotoRendered key={photo.id} photo={photo} photos={photos} setPhotos={setPhotos} />
              ))}
            </div> */}

            <div className="flex justify-between rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
              <Button
                variant="outline"
                onClick={() => replace(`/dashboard/activities/create?slug=${activity?.slug}`)}
              >
                <ArrowLeft className="ml-1 h-4 w-4" />
                Regresar
              </Button>
              <Button onClick={handleNext}>
                Continuar
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
