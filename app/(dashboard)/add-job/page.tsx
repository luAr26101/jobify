import CreateJobForm from "@/components/create-job-form";
import { auth } from "@clerk/nextjs/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function AddJobPage() {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJobForm />
    </HydrationBoundary>
  );
}

export default AddJobPage;
