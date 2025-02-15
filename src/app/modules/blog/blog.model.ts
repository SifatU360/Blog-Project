import { Schema, model } from 'mongoose';
import { TBlog } from './blog.interface';

const BlogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: [true, 'Title is required'] },
    content: { type: String, required: [true, 'Content is required'] },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Blog = model<TBlog>('Blog', BlogSchema);
