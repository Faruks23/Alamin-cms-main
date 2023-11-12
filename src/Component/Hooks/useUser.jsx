import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {
    data: users = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://b7a12-summer-camp-server-side-faruks23.vercel.app/GetUsers"
      );
      return res.json();
    },
  });

  return [users, loading, refetch];
};

export default useUser;
