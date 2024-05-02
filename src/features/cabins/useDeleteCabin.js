import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin(){
    const queryClient = useQueryClient();
  const { isloading: isDeleting, mutate:deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("cabin deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
return {isDeleting,deleteCabin}
}