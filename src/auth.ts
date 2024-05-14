import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"

export const {
  handlers: {GET, POST},
  auth,
  signIn
} = NextAuth({

})