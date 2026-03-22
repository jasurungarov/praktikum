import { currentUser } from '@clerk/nextjs'
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await currentUser()
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),

  // ✅ Video upload qo'shildi
  videoUploader: f({
    video: {
      maxFileSize: "512MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await currentUser()
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;