import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

const callbacks = (req: any, res: any) => ({
  async jwt(token: any, user: any) {
    if (user) {
      token.user = user;
    }
    return token
  },

  async session(session: any, token: any, user: any) {
    session.accessToken = token.user.accessToken
    session.user = token.user
    return Promise.resolve(session);
  },
})

const options = (req: any, res: any) => ({
  providers: [
    Providers.Credentials({
      async authorize(credentials: any) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
        }).then(res => res.json());

        if (response.errors || !response.token) {
          throw new Error(`Woops! Wrong Username or password.&email=${credentials.email}`);
        }
        return response;
      }
    })
  ],
  callbacks: callbacks(req, res),
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/logout'
  },
  secret: process.env.SECRET,
  session: {
    jwt: true,
    maxAge: TOKEN_MAX_AGE,
    updateAge: 0,
  },
  jwt: {
    secret: process.env.SECRET,
    maxAge: TOKEN_MAX_AGE,
  },
  debug: true,
})

//@ts-ignore
const auth = (req, res) => { return NextAuth(req, res, options(req, res)) }

export default auth;

