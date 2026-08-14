import CreateJobForm from "@/components/create-job-form";
import { auth } from "@clerk/nextjs/server";

async function AddJobPage() {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();
  return (
    <div>
      <CreateJobForm />
    </div>
  );
}

export default AddJobPage;
