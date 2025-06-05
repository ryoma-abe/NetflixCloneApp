import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.movie.createMany({
    data: [
      {
        id: "1",
        title: "Inception",
        description: "夢の中の夢の中で繰り広げられるサスペンス。",
        thumbnail: "https://example.com/inception.jpg",
        videoUrl: "https://example.com/inception.mp4",
        genre: "Sci-Fi",
        duration: "148分",
      },
      {
        id: "2",
        title: "The Matrix",
        description: "仮想世界に閉じ込められた人類と救世主の物語。",
        thumbnail: "https://example.com/matrix.jpg",
        videoUrl: "https://example.com/matrix.mp4",
        genre: "Action",
        duration: "136分",
      },
      {
        id: "3",
        title: "Spirited Away",
        description: "不思議な世界で成長していく少女の冒険。",
        thumbnail: "https://example.com/spiritedaway.jpg",
        videoUrl: "https://example.com/spiritedaway.mp4",
        genre: "Fantasy",
        duration: "125分",
      },
    ],
  });
}

main()
  .then(() => {
    console.log("✅ Seed completed");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    return prisma.$disconnect();
  });
