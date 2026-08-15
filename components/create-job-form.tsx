"use client";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/form-components";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { createJobAction } from "@/utils/actions";
import {
  createAndEditJobSchema,
  type CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CreateJobForm() {
  const formId = "add-job";
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Failed to create job");
        return;
      }
      toast.success("Job created successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      // form.reset(); -- we don't need to reset the form because we are redirecting to the jobs page
      router.push("/jobs");
    },
  });

  function onSubmit(data: CreateAndEditJobType) {
    mutate(data);
  }
  return (
    <>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted rounded p-8"
      >
        <h2 className="mb-6 text-2xl font-semibold capitalize">add job</h2>
        <FieldGroup className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* position */}
          <CustomFormField
            formId={formId}
            name="position"
            control={form.control}
          />
          {/* company */}
          <CustomFormField
            formId="add-job"
            name="company"
            control={form.control}
          />
          {/* location */}
          <CustomFormField
            formId="add-job"
            name="location"
            control={form.control}
          />
          {/* job status */}
          <CustomFormSelect
            formId={formId}
            name="status"
            control={form.control}
            items={Object.values(JobStatus)}
            labelText="job status"
          />
          {/* job mode */}
          <CustomFormSelect
            formId={formId}
            name="mode"
            control={form.control}
            items={Object.values(JobMode)}
            labelText="job mode"
          />
        </FieldGroup>
        <Field orientation="horizontal" className="mt-6">
          {/* <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="capitalize"
          >
            reset
          </Button> */}
          <Button type="submit" className="capitalize" disabled={isPending}>
            {isPending ? "creating..." : "create job"}
          </Button>
        </Field>
      </form>
    </>
  );
}

export default CreateJobForm;
