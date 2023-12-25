"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  deleteActivityPhoto,
  getActivity,
  getActivityPhotos,
  createActivityPhoto,
} from "#/app/activities/services";
import { Activity, ActivityPhoto } from "#/app/activities/types";
import { deletePhoto } from "#/app/cloudinary/services";
import { revalidate } from "#/app/revalidate/services";
import { ActivityStepper } from "#/components/ActivityStepper";
import { CreateImageButton } from "#/components/CreateImageButton";
import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";
import { Photo } from "#/components/Photo";
import { Button } from "#/components/ui/button";
import { Typography } from "#/components/ui/typography";
import { CloudinaryResult, CloudinaryWidget } from "#/types";

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
        className="rounded-xl mb-4 w-full overflow-hidden"
      />
      <div className="absolute top-4 right-4">
        <Button
          variant="destructive"
          size="sm"
          className="rounded-full"
          onClick={() => handleDeletePhoto(photo.id, photo.path)}
          isLoading={isDeleting}
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
      croppingAspectRatio: 2,
      croppingShowDimensions: false,
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

  return (
    <>
      <main className="container max-w-6xl mx-auto my-16">
        <section className="flex gap-40">
          <ActivityStepper step={2} />
          <div className="w-full">
            <Typography variant="h2" className="mb-8">
              Fotos
            </Typography>
            <div className="flex items-center justify-end mb-4">
              <CreateImageButton
                prompt={activity?.description || ""}
                onCreate={handleIaPhoto}
                disabled={!activity?.description}
              />
            </div>
            <div
              className="border-dashed border-2 h-[150px] rounded-xl flex items-center justify-center hover:bg-slate-100 transition-all mb-8 cursor-pointer"
              onClick={onLoadPictures}
            >
              <Typography variant="h5">Subir fotos</Typography>
            </div>
            <div className="gap-4">
              {photos.map((photo) => (
                <PhotoRendered key={photo.id} photo={photo} photos={photos} setPhotos={setPhotos} />
              ))}
            </div>

            <div className="flex justify-between bg-slate-100 dark:bg-slate-900 p-4 rounded-xl">
              <Button
                variant="outline"
                onClick={() => replace(`/dashboard/activities/create?slug=${activity?.slug}`)}
              >
                <ArrowLeft className="w-4 h-4 ml-1" />
                Regresar
              </Button>
              <Button onClick={handleNext}>
                Continuar
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
