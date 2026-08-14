import CreateJobForm from "@/components/create-job-form";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

async function AddJobPage() {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();
  const users = await prisma.testProfile.findMany();
  return (
    <div>
      <div>
        {users.map((user) => {
          return (
            <h2 key={user.id} className="text-2xl font-bold">
              {user.name}
            </h2>
          );
        })}
      </div>
      <CreateJobForm />
    </div>
  );
}

export default AddJobPage;
