import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: String,
    description: String,
    content: String,
    slug: String,
    category: String,
    tag: String,
    coverImage: String,
    published: { type: Boolean, default: false },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
