import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  theme:{
    logo:"https://links.papareact.com/sq0",
    brandColor:"#F13287",
    colorScheme:"dark"
  },
  callbacks:{
    async session({
      session,token,user
    }){
      session.user.username = session.user.name.split(" ").join("").toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    }
  }
})