export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to all routes under "/dashboard"
};
