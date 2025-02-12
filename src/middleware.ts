import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/api/webhooks/clerk",
    "/about",
    "/features",
    "/professionals",
    "/signin",
    "/signup"
  ],
  
  // Routes that can be accessed while signed out
  ignoredRoutes: [
    "/api/webhooks/clerk"
  ],
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // If the user is logged in and trying to access a protected route, allow them
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }

    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 