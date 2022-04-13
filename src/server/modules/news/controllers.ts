import { NextApiRequest, NextApiResponse } from "next";
import { NewsModel } from "./entity";

export async function getNews(req: NextApiRequest, res: NextApiResponse) {
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

    const news = await NewsModel.find({}).limit(queryParams.limit).exec();

    return res.status(200).json({ data: news });
  } catch (error: any) {
    return res.status(400).json({ data: null, error: error.message });
  }
}

export async function getNew(req: NextApiRequest, res: NextApiResponse) {
  try {
    type Query = {
      slug?: string;
    };
    const query = req.query as unknown as Query;

    if (!query.slug) {
      throw new Error("slug is required");
    }

    const news = await NewsModel.findOne({ slug: query.slug }).exec();

    if (!news) {
      throw new Error("New not exists");
    }

    return res.status(200).json({ data: news?.toJSON() });
  } catch (error: any) {
    return res.status(400).json({ data: null, error: error.message });
  }
}

export async function createNew(req: NextApiRequest, res: NextApiResponse) {
  try {
    type Query = {
      slug?: string;
    };
    const query = req.query as unknown as Query;

    if (!query.slug) {
      throw new Error("slug is required");
    }

    const news = await NewsModel.findOne({ slug: query.slug }).exec();

    if (!news) {
      throw new Error("New not exists");
    }

    return res.status(200).json({ data: news?.toJSON() });
  } catch (error: any) {
    return res.status(400).json({ data: null, error: error.message });
  }
}
