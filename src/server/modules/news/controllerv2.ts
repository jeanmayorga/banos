import { NewsModel } from "./entity";
import { GetManyNewsOptions } from "types";

export async function getOneNew(slug: string) {
  try {
    const data = await NewsModel.findOne({ slug }).exec();

    return data;
  } catch (error) {
    return null;
  }
}

export async function getManyNews(options: GetManyNewsOptions) {
  try {
    const { limit } = Object.assign(
      {
        limit: 10,
      },
      options
    );

    const data = await NewsModel.find().limit(limit).exec();

    return data;
  } catch (error) {
    return [];
  }
}

// export async function createOneNew(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     type Body = {
//       title: string;
//       cover: string;
//       body: string;
//     };
//     const body = req.body as unknown as Body;

//     const newNews = await NewsModel.create(body);

//     return res.status(200).json({ data: newNews.toJSON() });
//   } catch (error: any) {
//     return res.status(400).json({ data: null, error: error.message });
//   }
// }
