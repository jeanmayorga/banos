// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "../../../server/middlewares/database";
import * as controllers from "../../../server/modules/news";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDatabase();

  if (req.method === "GET") {
    return controllers.getNews(req, res);
  }

  if (req.method === "POST") {
    return controllers.createNew(req, res);
  }

  return res.status(200).json({ status: "ok" });
}
