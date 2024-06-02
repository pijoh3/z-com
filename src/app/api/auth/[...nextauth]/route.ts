import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from "cookie";

const handler = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        id: {},
        password: {},
      },
      authorize: async (credentials) => {
        const authResponse = await fetch(
          `${process.env.NEXTAUTH_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie", setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
        }

        if (!authResponse.ok) return null;

        const user = await authResponse.json();
        console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});

console.log(handler.signIn, handler.auth);

export { handler as GET, handler as POST };
