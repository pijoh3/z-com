import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  if (!req.nextauth.token)
    NextResponse.redirect("http:localhost:3000/i/flow/login");
});

export const config = {
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};
