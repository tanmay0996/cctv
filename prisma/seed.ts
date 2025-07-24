import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create cameras
  const camera1 = await prisma.camera.create({
    data: { name: "Vault", location: "Level B2" },
  });
  const camera2 = await prisma.camera.create({
    data: { name: "Shop Floor A", location: "Main Hall" },
  });
  const camera3 = await prisma.camera.create({
    data: { name: "Entrance", location: "Front Gate" },
  });

  const cameras = [camera1, camera2, camera3];
  const types = ["Unauthorised Access", "Gun Threat", "Face Recognised"];
  const now = new Date();

  // 12 incidents over 24h
  for (let i = 0; i < 12; i++) {
    const camera = cameras[i % 3];
    const tsStart = new Date(now.getTime() - i * 60 * 60 * 1000); // hourly gap
    const tsEnd = new Date(tsStart.getTime() + 5 * 60 * 1000); // 5 mins later

    await prisma.incident.create({
      data: {
        type: types[i % types.length],
        tsStart,
        tsEnd,
        thumbnailUrl: `/thumbnails/thumb${(i % 3) + 1}.jpg`, // Put 3 images in /public/thumbnails
        cameraId: camera.id,
        resolved: false,
      },
    });
  }
}

main()
  .then(() => console.log("Seeded!"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
