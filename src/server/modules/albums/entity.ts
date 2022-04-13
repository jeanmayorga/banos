import { getModelForClass, ModelOptions, prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Album {
  @prop({ required: true, index: true, trim: true, default: "" })
  public title!: string;
}

export const AlbumModel = getModelForClass(Album);
