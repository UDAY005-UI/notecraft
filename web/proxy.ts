import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher([
  "/admin-panel(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ✅ FIXED
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const role = user.publicMetadata?.role;

    if (role !== "Admin") {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }
  }
});

export const config = {
  matcher: ["/admin-panel(.*)"],
};