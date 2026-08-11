import { auth } from "@clerk/nextjs/server";

async function AddJobPage() {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();
  return <>Add job page</>;
}

export default AddJobPage;
