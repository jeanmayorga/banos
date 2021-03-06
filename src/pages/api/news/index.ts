import type { NextApiRequest, NextApiResponse } from "next";
import * as controllers from "../../../server/modules/news";
import { connectDatabase } from "server/middlewares";
import { getManyNews } from "server/modules";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDatabase();

  if (req.method === "GET") {
    const limit = Number(req.query.limit);
    const data = await getManyNews({ limit });

    return res.status(200).json({ data });
  }

  if (req.method === "POST") {
    return controllers.createNew(req, res);
  }

  return res.status(200).json({ data: "ok" });
}
