import { getProfile } from "api/profile";
import { useQuery } from "@tanstack/react-query";

export default function useProfile(enabled = false) {
  const { data: profile, refetch: refetchProfile } = useQuery<any>(
    ["profile"],
    getProfile,
    { enabled }
  );
  return { profile, refetchProfile };
}
