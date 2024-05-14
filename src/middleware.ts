export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/compose/tweet", "/home", "/explore", "/message", "/search"],
};
