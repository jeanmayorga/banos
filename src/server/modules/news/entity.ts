import {
  getModelForClass,
  ModelOptions,
  mongoose,
  pre,
  prop,
} from "@typegoose/typegoose";
import slugify from "slugify";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

@pre<News>("save", function (next) {
  if (!this.isModified("title")) return next();
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const day = date.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });

  this.slug = `${year}/${month}/${day}/${slugify(this.title)}`;
  this.title = capitalizeFirstLetter(this.title);
  return next();
})
@ModelOptions({ schemaOptions: { timestamps: true } })
export class News {
  @prop({ index: true, unique: true, trim: true, lowercase: true })
  public slug?: string;

  @prop({ required: true, index: true, trim: true })
  public title!: string;

  @prop({ required: true, trim: true })
  public cover!: string;

  @prop({ default: null, type: () => mongoose.Types.ObjectId })
  public albumId?: mongoose.Types.ObjectId;

  @prop({ required: true, trim: true })
  public body!: string;
}

export const NewsModel = getModelForClass(News);
