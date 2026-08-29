"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createAndEditJobSchema,
  type CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";

import { Button } from "@/components/ui/button";

import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/form-components";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function EditJobForm({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast.error("There was an error ...");
        return;
      }
      toast.success("Job updated successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      router.push("/jobs");
      // form.reset();
    },
  });

  // 1. Define your form.
  const formId = "edit-job";
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CreateAndEditJobType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate(values);
  }

  return (
    <>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted rounded p-8"
      >
        <h2 className="mb-6 text-4xl font-semibold capitalize">edit job</h2>
        <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* position */}
          <CustomFormField
            formId={formId}
            name="position"
            control={form.control}
          />
          {/* company */}
          <CustomFormField
            formId={formId}
            name="company"
            control={form.control}
          />
          {/* location */}
          <CustomFormField
            formId={formId}
            name="location"
            control={form.control}
          />

          {/* job status */}
          <CustomFormSelect
            formId={formId}
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          {/* job  type */}
          <CustomFormSelect
            formId={formId}
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />

          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? "updating..." : "edit job"}
          </Button>
        </div>
      </form>
    </>
  );
}
export default EditJobForm;
