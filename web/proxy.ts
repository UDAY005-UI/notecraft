import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher([
  "/admin-panel(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const role = (sessionClaims as any)?.publicMetadata?.role;

    if (role !== "Admin") {
      return NextResponse.redirect(
        new URL("/access-denied", req.url)
      );
    }
  }
});

export const config = {
  matcher: ["/admin-panel(.*)"],
};