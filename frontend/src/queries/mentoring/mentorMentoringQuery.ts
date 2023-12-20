import {
  acceptMentoring,
  getMentoringApplies,
  rejectMentoring,
} from "@/api/mentoring/mentorApi";
import { STALE_TIME } from "@/constants";
import { GetMentoringAppliesResponse } from "@/types/api/mentoring";

import { useMutation, useQuery } from "@tanstack/react-query";

export const GET_MENTORING_APPLIES = ["mentoringApplies"];
export const ACCEPT_MENTORING = ["acceptMentoring"];
export const REJECT_MENTORING = ["rejectMentoring"];

export const useMentoringApplies = () => {
  return useQuery<GetMentoringAppliesResponse>(GET_MENTORING_APPLIES, () =>
    getMentoringApplies()
  );
};

export const useMentoringAcceptMutation = (
  mentoringId: number,
  onSuccess?: () => void,
  onError?: () => void
) =>
  useMutation(ACCEPT_MENTORING, () => acceptMentoring(mentoringId), {
    onSuccess: onSuccess!,
    onError: onError!,
  });

export const useMentoringRejectMutation = (
  mentoringId: number,
  onSuccess?: () => void,
  onError?: () => void
) =>
  useMutation(REJECT_MENTORING, () => rejectMentoring(mentoringId), {
    onSuccess: onSuccess!,
    onError: onError!,
  });
