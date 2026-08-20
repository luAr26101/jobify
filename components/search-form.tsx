"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "@/utils/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchForm() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";
  const router = useRouter();
  const pathname = usePathname();

  const items = ["all", ...Object.values(JobStatus)];
  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;

    const params = new URLSearchParams();
    params.set("search", search);
    params.set("jobStatus", jobStatus);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className="bg-muted mb-16 grid gap-4 rounded-lg p-8 sm:grid-cols-2 md:grid-cols-3"
      onSubmit={submitHandler}
    >
      <Input
        type="text"
        placeholder="Search jobs"
        name="search"
        defaultValue={search}
      />
      <Select name="jobStatus" defaultValue={jobStatus}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((status) => {
              return (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit" className="cursor-pointer">
        Search
      </Button>
    </form>
  );
}

export default SearchForm;
