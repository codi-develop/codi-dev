import { useQuery } from '@tanstack/react-query';
import {
  getDailyMentorings,
  getMonthlyMentorings,
  getTodayMentorings,
} from '@/api/mentoring/commonApi';
import { STALE_TIME } from '@/constants';
import {
  GetDailyMentoringsParams,
  GetMonthlyMentoringsParams,
  GetMonthlyMentoringsResponse,
  GetTodayMentoringsResponse,
} from '@/types/api/mentoring';

export const GET_DAILY_MENTORINGS_KEY = ['dailyMentorings'];
export const GET_MONTHLY_MENTORINGS_KEY = ['monthlysMentorings'];
export const GET_TODAY_MENTORINGS_KEY = ['todayMentorings'];

export const useDailyMentoringsQuery = ({
  date,
  type,
  isPlatformUpdated
}: GetDailyMentoringsParams) => {

  const queryKey = [...GET_DAILY_MENTORINGS_KEY,type,date,isPlatformUpdated]

  return useQuery(
    queryKey,
    () => getDailyMentorings({ date, type }),
    {
      enabled: date !== '',
      retry: false,
      staleTime: STALE_TIME.SOMETIMES,
    },
  );
};

export const useMonthlyMentoringsQuery = ({
  month,
  type,
  isPlatformUpdated
}: GetMonthlyMentoringsParams) => {
  const querykey = [...GET_MONTHLY_MENTORINGS_KEY,month,type,isPlatformUpdated];


  return useQuery<GetMonthlyMentoringsResponse>(
    querykey,
    () => getMonthlyMentorings({ month, type }),
    {
      enabled: month !== undefined,
      staleTime: STALE_TIME.SOMETIMES,
    },
  );
};

export const useTodayMentoringsQuery = (isProfile: boolean) => {
  return useQuery<GetTodayMentoringsResponse[]>(
    [...GET_TODAY_MENTORINGS_KEY, isProfile],
    () => getTodayMentorings(),
    {
      staleTime: STALE_TIME.SOMETIMES,
    },
  );
};
