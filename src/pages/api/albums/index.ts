// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "../../../server/middlewares/database";
import * as controllers from "../../../server/modules/albums/controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDatabase();

  if (req.method === "GET") {
    return controllers.getAlbums(req, res);
  }

  if (req.method === "POST") {
    return controllers.createAlbum(req, res);
  }

  return res.status(200).json({ status: "ok" });
}
