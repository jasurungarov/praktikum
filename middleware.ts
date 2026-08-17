import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ru", "uz", "tr", "ky"],
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: (req) => intlMiddleware(req),
  publicRoutes: [
    "/:lng",
    "/:lng/courses",
    "/:lng/course/:slug",
    "/:lng/blogs",
    "/:lng/blogs/:slug",
    "/:lng/consulting",
    "/:lng/iqra-arabia",
    "/:lng/contacts",
    "/:lng/api/uploadthing",
    "/:lng/instructors",
    "/:lng/instructors/:instructorId",
    "/:lng/shopping/cart",
    "/:lng/sign-in",
    "/:lng/sign-up",
  ],
  ignoredRoutes: ["/en/api/webhook"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
