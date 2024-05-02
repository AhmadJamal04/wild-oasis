import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins(){
    const { isLoading, data: cabins } = useQuery({
        queryFn: getCabins,
        queryKey: ["cabin"],
      });
      return {isLoading,cabins}
}