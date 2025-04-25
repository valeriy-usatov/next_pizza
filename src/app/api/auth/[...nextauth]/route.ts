import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../../../prisma/prismaClient';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';

export const authOptions:NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        };
      },
    }),
    CredentialsProvider ({
      name: 'Credentials',
      credentials:{
        email: {label: 'Email', type: "text"},
        password: {label: 'Password', type: "password"},
      },
      // Здесь пишется проверка на уровне БД
      async authorize(credentials){
        if(!credentials) {
          return null
        }
        const values = {
          email:credentials.email
        };
        const findUser = await prisma.user.findFirst({
          where: values
        });

        if(!findUser) {
          return null
        }
        // Проверям пароль на совпадение из БД и который мы водим
        const isPasswordValid = await compare(credentials.password, findUser.password);

        if (!isPasswordValid) return null;
          // Если ввели корректный пароль но он оказался не активированый, то return null
        if (!findUser.verified) return null;

        return {
          id: String(findUser.id),
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }

        console.log(user, account);

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [ /* т.е ищи или по email или по provider */
              { provider: account?.provider, providerId: account?.providerAccountId },
              { email: user.email },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: { /* если нашли , то обновляем и providerId и provider и иначе создаем нового пользователя */
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || 'User #' + user.id,
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email!,
        },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName || "";
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
