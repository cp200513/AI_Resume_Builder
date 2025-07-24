-- CreateTable
CREATE TABLE "resumes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT,
    "colorHex" TEXT NOT NULL DEFAULT '#000000',
    "borderStyle" TEXT NOT NULL DEFAULT 'squircle',
    "summary" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "jobTitle" TEXT,
    "city" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_experience" (
    "id" TEXT NOT NULL,
    "position" TEXT,
    "company" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "description" TEXT,
    "resumeID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "degree" TEXT,
    "school" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "resumeID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "work_experience" ADD CONSTRAINT "work_experience_resumeID_fkey" FOREIGN KEY ("resumeID") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_resumeID_fkey" FOREIGN KEY ("resumeID") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
