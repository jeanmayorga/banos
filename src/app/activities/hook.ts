import { useMutation } from "@tanstack/react-query";

import { deleteActivityPhoto } from "./services";

export function useDeleteActivityPhoto() {
  return useMutation({
    mutationFn: deleteActivityPhoto,
    onSuccess: () => {
      console.log("success");
    },
  });
}
