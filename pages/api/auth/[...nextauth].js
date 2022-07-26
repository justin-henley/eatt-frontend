/* 
    Contains the dynamic route handler for NextAuth.js
    Also contains all the global NextUath.js configurations

    All requests to /api/auth/* (signIn, callback, signOut, etc) will be automatically handled ny NextAuth.js
*/
// NextAuth.js
import NextAuth from 'next-auth/next';
// Providers (Services users can use to log in)
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
  // Configure authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // TODO add additional providers here
  ],
  // CALLBACKS - https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // Called whenever a session is checked.  Only a subset of the token is returned, so anything added to the jwt callback must be explicitly forwarded here
    async session({ session, token, user }) {
      session.tokenData = token;
      session.userData = user;
      return session;
    },
    // Called when a JSON Web Token is created or updated.  User, account, profile, and isNewUser are only passed on sign in.
    async jwt({ token, account, user, profile, isNewUser }) {
      console.log(
        'Token: ',
        token,
        'Account: ',
        account,
        'User: ',
        user,
        'Profile: ',
        profile,
        'New user? ',
        isNewUser
      );
      return token;
    },
    // Controls whether a user may sign in
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
});
