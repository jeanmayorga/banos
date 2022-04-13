import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";
import { PhotoModel } from "../photos";
import { AlbumModel } from "./entity";

export async function getAlbums(req: NextApiRequest, res: NextApiResponse) {
  try {
    type Query = {
      limit?: number;
    };
    const query = req.query as unknown as Query;
    const queryParams = Object.assign(
      {
        limit: 10,
      },
      query
    );

    const albums = await AlbumModel.find({}).limit(queryParams.limit).exec();

    return res.status(200).json({ data: albums });
  } catch (error: any) {
    return res.status(400).json({ data: null, error: error.message });
  }
}

export async function getAlbum(req: NextApiRequest, res: NextApiResponse) {
  try {
    type Query = {
      albumId?: string;
      limit?: number;
    };
    const query = req.query as unknown as Query;

    if (!query.albumId) {
      throw new Error("albumId is required");
    }
    if (!Types.ObjectId.isValid(query.albumId)) {
      throw new Error("albumId is not valid");
    }

    const queryParams = Object.assign(
      {
        albumId: new Types.ObjectId(query.albumId),
        limit: 10,
      },
      query
    );

    const album = await AlbumModel.findById(queryParams.albumId).exec();

    if (!album) {
      throw new Error("album not exitsts");
    }

    const photos = await PhotoModel.find({ albumId: queryParams.albumId })
      .limit(queryParams.limit)
      .exec();

    return res.status(200).json({ data: { ...album.toJSON(), photos } });
  } catch (error: any) {
    return res.status(400).json({ data: null, error: error.message });
  }
}

export async function createAlbum(req: NextApiRequest, res: NextApiResponse) {
  try {
    type Body = {
      title: string;
      photos: {
        url: string;
        alt: string;
      }[];
    };
    const body = req.body as unknown as Body;

    if (!body.title) {
      throw new Error("title is required");
    }

    const albumObject = Object.assign(
      {
        title: "Untitled album",
        photos: [],
      },
      body
    );

    const newAlbum = await AlbumModel.create({ title: albumObject.title });

    const photoObjects = albumObject.photos.map((photo) => {
      return Object.assign(
        {
          albumId: newAlbum._id,
          alt: "Banos Ecuador",
        },
        photo
      );
    });

    const newPhotos = await PhotoModel.insertMany(photoObjects);

    const album = newAlbum.toJSON();

    return res.status(200).json({ data: { ...album, photos: newPhotos } });
  } catch (error: any) {
    return res.status(400).json({ data: null, error: error.message });
  }
}
