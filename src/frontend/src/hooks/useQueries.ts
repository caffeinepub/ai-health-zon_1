import { useMutation, useQuery } from "@tanstack/react-query";
import type { InsightContent } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllInsights() {
  const { actor, isFetching } = useActor();
  return useQuery<InsightContent[]>({
    queryKey: ["insights"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInsights();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetInsightsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<InsightContent[]>({
    queryKey: ["insights", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInsightsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useRecordPageView() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (section: string) => {
      if (!actor) return;
      await actor.recordPageView(section);
    },
  });
}

export function useSubmitDemoBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      org: string;
      mobile: string;
      email: string;
      city: string;
      msg: string;
      prefDate: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitDemoBooking(
        data.name,
        data.org,
        data.mobile,
        data.email,
        data.city,
        data.msg,
        data.prefDate,
      );
    },
  });
}

export function useSubmitNetworkJoinRequest() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      orgType: string;
      orgName: string;
      contact: string;
      msg: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitNetworkJoinRequest(
        data.name,
        data.orgType,
        data.orgName,
        data.contact,
        data.msg,
      );
    },
  });
}

export function useSubmitContactInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactInquiry(
        data.name,
        data.email,
        data.phone,
        data.message,
      );
    },
  });
}
