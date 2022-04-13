import { mongoose } from "@typegoose/typegoose";
import { PhotoModel } from "./entity";

export async function getPhotosByAlbumId(options: {
  albumId: mongoose.Types.ObjectId;
  limit: number;
}) {
  const photos = await PhotoModel.find({ albumId: options.albumId })
    .limit(options.limit)
    .exec();

  return photos;
}

// export async function createPhoto(photo: {
//   albumId: mongoose.Types.ObjectId;
//   url: string;
//   alt: string;
// }) {
//   return await PhotoModel.create(photo);
// }

// export async function createManyPhotos(
//   photos: {
//     albumId: mongoose.Types.ObjectId;
//     url: string;
//     alt: string;
//   }[]
// ) {
//   return await PhotoModel.insertMany(photos);
// }
