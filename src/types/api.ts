export interface Response<T> {
  data: T;
}

export type MongoData<T> = T & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
