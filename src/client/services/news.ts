import { api } from "./api";
import { News } from "server/modules";
import { GetManyNewsOptions, MongoData, Response } from "types";

export async function getOneNew(slug: string) {
  const response = await api.get<Response<MongoData<News>>>(`/news/${slug}`);
  return response.data.data;
}

export async function getManyNews(params: GetManyNewsOptions) {
  const response = await api.get<Response<MongoData<News>[]>>(`/news`, {
    params,
  });

  return response.data;
}

export async function createNew(params: typeof News.prototype) {
  const response = await api.post(`/news`, params);
  return response;
}
