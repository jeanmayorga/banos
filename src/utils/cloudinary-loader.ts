// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
export default function cloudinaryLoader(options: { src: string; width: number; quality: number }) {
  const params = ["f_auto", "c_limit", `w_${options.width}`, `q_${options.quality || "auto"}`];
  return `https://res.cloudinary.com/da3uyv9xp/image/upload/${params.join(",")}/${options.src}`;
}
