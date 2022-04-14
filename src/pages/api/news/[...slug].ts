import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "server/middlewares";
import { getOneNew } from "server/modules/news";
import { formatSlug } from "utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDatabase();

  if (req.method === "GET") {
    const slug = formatSlug(req.query.slug);
    const data = await getOneNew(slug);

    return res.status(200).json({ data });
  }

  return res.status(200).json({ data: "ok" });
}
