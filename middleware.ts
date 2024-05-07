import { authMiddleware } from "@clerk/nextjs";

const publicPaths = ["/", "/sign-in*", "/sign-up*"];

export default authMiddleware({
  // Allow signed out users to access the specified routes for preview purposes only:
  // publicRoutes: [
  //   "/",
  //   "/order",
  //   "/sales",
  //   "/sign-in",
  //   "/drinks/(.*)",
  //   "/api/drinks/(.*)",
  //   "/api/order",
  //   "/api/sales",
  // ],
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
