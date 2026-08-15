"use server";

import { prisma } from "@/utils/db";
import {
  createAndEditJobSchema,
  type CreateAndEditJobType,
  type JobType,
} from "@/utils/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function authenticateAndRedirect(): Promise<string> {
  const user = await currentUser();
  if (!user) redirect("/");
  return user.id;
}

export async function createJobAction(
  values: CreateAndEditJobType,
): Promise<JobType | null> {
  const userId = await authenticateAndRedirect();

  try {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a delay of 3 seconds
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: { ...values, clerkId: userId },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}
