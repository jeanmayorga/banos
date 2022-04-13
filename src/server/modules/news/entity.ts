import {
  getModelForClass,
  ModelOptions,
  mongoose,
  pre,
  prop,
} from "@typegoose/typegoose";
import slugify from "slugify";

@pre<News>("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = slugify(this.title);
  return next();
})
@ModelOptions({ schemaOptions: { timestamps: true } })
export class News {
  @prop({ required: true, index: true, unique: true, trim: true })
  public slug!: string;

  @prop({ required: true, index: true, trim: true })
  public title!: string;

  @prop({ required: true, index: true, trim: true })
  public cover!: string;

  @prop({ index: true, default: null, type: () => mongoose.Types.ObjectId })
  public albumId?: mongoose.Types.ObjectId;

  @prop({ required: true, index: true, trim: true })
  public body!: string;
}

export const NewsModel = getModelForClass(News);
