import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" }, // Use 'username' in credentials
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
       
        try {
          const response = await axios.post(
            `https://ai-projects-backend.onrender.com/api/v1/auth/login`, // Fixed template literal syntax
            {
              email: credentials.email, // Assuming the backend expects 'email', but 'username' was used in the frontend
              password: credentials.password,
            }
          );

          console.log("Login response:", response.data);

          if (response.data) {
            return {
              ...response.data.user, // Assume user data is under 'user' key
              token: response.data.backendTokens.accessToken, // Assume token is returned under 'token'
            };
          } else {
            throw new Error(response.data.message || "Authentication failed");
          }
        } catch (error) {
          console.error("Error in authorization:", error);
          throw new Error("Login failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
     
      if (user) {
        token.id = user.id; // Assuming user data structure from response
        // token.role = user?.role;
        token.email = user.email;
        // token.token = user?.token; // Storing JWT token
      }

      return token;
    },

    async session({ token, session }: any) {
     
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.token = token.token;
        session.user.firstName = token.firstName || ""; // Default empty if not available
        session.user.lastName = token.lastName || "";
        session.user.role = token.role;
        session.user.picture = token.picture || ""; // Default empty if not available
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;
