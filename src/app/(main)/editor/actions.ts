"use server";

import { PrismaClient } from "@/generated/prisma";
import { resumeSchema, resumeSchemaType } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(values: resumeSchemaType) {
  const prisma = new PrismaClient();

  const { id } = values;
  console.log("received values", values);

  // parse and extract fields
  const { photo, workExperiences, education, ...resumeValues } =
    resumeSchema.parse(values);

  // extract title, description, and isolate jobtitle for Prisma
  const { title, description, jobtitle, ...restValues } = resumeValues;

  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  // check for existing resume
  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  // handle photo uploads/deletions
  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });
    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  // assemble nested create data
  const workCreates =
    workExperiences?.map((exp) => ({
      ...exp,
      startDate: exp.startDate
        ? new Date(exp.startDate).toISOString()
        : undefined,
      endDate: exp.endDate ? new Date(exp.endDate).toISOString() : undefined,
    })) ?? [];
  const eduCreates =
    education?.map((edu) => ({
      ...edu,
      startDate: edu.startDate
        ? new Date(edu.startDate).toISOString()
        : undefined,
      endDate: edu.endDate ? new Date(edu.endDate).toISOString() : undefined,
    })) ?? [];

  if (id) {
    // update existing record
    return prisma.resume.update({
      where: { id: id },
      data: {
        title,
        description,
        ...restValues,
        jobTitle: jobtitle,
        photoUrl: newPhotoUrl,
        workExperiences: { deleteMany: {}, create: workCreates },
        educations: { deleteMany: {}, create: eduCreates },
        updatedAt: new Date().toISOString(),
      },
    });
  }

  // create new record
  return prisma.resume.create({
    data: {
      // ensure title and description are provided (default to empty string)
      title: title ?? "",
      description: description ?? "",
      ...restValues,
      jobTitle: jobtitle,
      userId,
      photoUrl: newPhotoUrl,
      workExperiences: { create: workCreates },
      educations: { create: eduCreates },
    },
  });
}
