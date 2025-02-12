import { z } from 'zod';
import mongoose from 'mongoose';

export const createBlogValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid author ID",
  }),
  isPublished: z.boolean().default(true),
});


const updateBlogValidationSchema = z.object({
    title: z.string().nonempty("Title cannot be empty").optional(),
    content: z.string().nonempty("Content cannot be empty").optional(),
    author: z.string().optional(),
    isPublished: z.boolean().optional().default(true),
  });
  
  export type CreateBlogValidationType = z.infer<
    typeof createBlogValidationSchema
  >;
  export type UpdateBlogValidationType = z.infer<
    typeof updateBlogValidationSchema
  >;
  
  export const blogValidationSchema = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
  };