import {
  getModelForClass,
  ModelOptions,
  mongoose,
  prop,
} from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Photo {
  @prop({
    required: true,
    index: true,
    default: "",
    type: () => mongoose.Types.ObjectId,
  })
  public albumId!: mongoose.Types.ObjectId;

  @prop({ required: true, index: true, trim: true, default: "" })
  public url!: string;

  @prop({ required: true, trim: true, default: "" })
  public alt!: string;
}

export const PhotoModel = getModelForClass(Photo);
