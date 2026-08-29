import { Button } from "@/components/ui/button";
import { deleteJobAction } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function DeleteJobBtn({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Failed to delete job");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      toast.success("Job deleted successfully");
    },
  });
  return (
    <Button
      size="sm"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? "deleting ..." : "delete"}
    </Button>
  );
}

export default DeleteJobBtn;
