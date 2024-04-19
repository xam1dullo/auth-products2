-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "productPic" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
