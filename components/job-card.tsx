import type { JobType } from "@/utils/types";

function JobCard({ job }: { job: JobType }) {
  console.log(job);
  return <>Job card</>;
}

export default JobCard;
