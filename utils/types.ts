import * as z from "zod";

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  Pending = "pending",
  Interview = "interview",
  Declined = "declined",
}

export enum JobMode {
  FullTime = "full-time",
  PartTime = "part-time",
  Internship = "internship",
}

export const createAndEditJobSchema = z.object({
  position: z
    .string()
    .min(2, "Position must be at least 2 characters.")
    .max(50, "Position must be at most 50 characters."),
  company: z
    .string()
    .min(2, "Position must be at least 2 characters.")
    .max(50, "Position must be at most 50 characters."),
  location: z
    .string()
    .min(2, "Position must be at least 2 characters.")
    .max(50, "Position must be at most 50 characters."),
  status: z.enum(JobStatus, "Please select a valid job status."),
  mode: z.enum(JobMode, "Please select a valid job mode."),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
