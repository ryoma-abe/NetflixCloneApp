import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // ログイン成功直後に呼ばれる関数。
  callbacks: {
    // user: Googleログイン成功後にNextAuthが取得したユーザー情報（email, name, image など）
    async signIn({ user }) {
      // PrismaによるDBユーザー登録
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();
      // 既存ユーザーの確認
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });
      //  新規ユーザー登録（存在しないときのみ）
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: user.image,
          },
        });
      }
      // DB切断とログイン成功返却
      await prisma.$disconnect();
      return true;
    },
  },
};