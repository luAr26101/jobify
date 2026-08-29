import DeleteJobBtn from "@/components/delete-job-btn";
import JobInfo from "@/components/job-info";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { JobType } from "@/utils/types";
import { Briefcase, CalendarDays, MapPin, RadioTower } from "lucide-react";
import Link from "next/link";

function JobCard({ job }: { job: JobType }) {
  const date = new Intl.DateTimeFormat("ro-RO").format(new Date(job.createdAt));

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className="w-32 justify-center">
          <JobInfo
            icon={<RadioTower className="h-4 w-4" />}
            text={job.status}
          />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`jobs/${job.id}`}>edit</Link>
        </Button>
        <DeleteJobBtn id={job.id} />
      </CardFooter>
    </Card>
  );
}

export default JobCard;
