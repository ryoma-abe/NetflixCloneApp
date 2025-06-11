import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// NextAuth関数で認証設定を定義
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // ユーザーをDBに保存（存在しない場合のみ）
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: user.image,
          },
        });
      }

      await prisma.$disconnect();
      return true;
    },
  },
});

export { handler as GET, handler as POST };
