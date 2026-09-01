"use server";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/utils/db";
import {
  createAndEditJobSchema,
  type CreateAndEditJobType,
  type JobType,
} from "@/utils/types";
import { currentUser } from "@clerk/nextjs/server";
import dayjs from "dayjs";
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

type GetAllJobsActionType = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionType): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = await authenticateAndRedirect();

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }

    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.log(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = await authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.delete({
      where: { id, clerkId: userId },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
  let job: JobType | null = null;
  const userId = await authenticateAndRedirect();

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch {
    job = null;
  }
  if (!job) {
    redirect("/jobs");
  }
  return job;
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType,
): Promise<JobType | null> {
  const userId = await authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return job;
  } catch {
    return null;
  }
}

export async function getStatsAction(): Promise<{
  pending: number;
  interview: number;
  declined: number;
}> {
  const userId = await authenticateAndRedirect();

  // just to show Skeleton
  await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const stats = await prisma.job.groupBy({
      where: {
        clerkId: userId, // replace userId with the actual clerkId
      },
      by: ["status"],
      _count: {
        status: true,
      },
    });

    const statsObject = stats.reduce(
      (acc, curr) => {
        acc[curr.status] = curr._count.status;
        return acc;
      },
      {} as Record<string, number>,
    );

    const defaultStats = {
      pending: 0,
      declined: 0,
      interview: 0,
      ...statsObject,
    };

    return defaultStats;
  } catch {
    redirect("/jobs");
  }
}

export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = await authenticateAndRedirect();
  const sixMonthsAgo = dayjs().subtract(6, "month").toDate();
  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    // console.log(jobs);

    const applicationsPerMonth = jobs.reduce(
      (acc, job) => {
        const date = dayjs(job.createdAt).format("MMM YY");

        const existingEntry = acc.find((entry) => entry.date === date);

        if (existingEntry) {
          existingEntry.count += 1;
        } else {
          acc.push({ date, count: 1 });
        }

        return acc;
      },
      [] as Array<{ date: string; count: number }>,
    );

    return applicationsPerMonth;
  } catch {
    redirect("/jobs");
  }
}
