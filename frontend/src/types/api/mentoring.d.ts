import {
  DailyMentoringMember,
  MentoringMember,
  MentoringMentee,
  MonthlyMentoringMembers,
} from '../mentoring';
import { Mentor } from '../profile';
import { Schedule } from '../schedule';

export interface ApplyMentoringBody {
  applicationReason: string;
  date: string;
  time: string;
}
type GetMentoringType = 'mentees' | 'mentors';

export interface GetDailyMentoringsParams {
  date: string;
  type: GetMentoringType;
  isPlatformUpdated?:boolean;
}

export interface GetMonthlyMentoringsParams {
  month: string;
  type: GetMentoringType;
  isPlatformUpdated?:boolean;
}

export interface GetMentoringAppliesResponse {
  data: GetMentoringAppliesResponseData[];
  pageInfo: PageInfo;
}

export interface GetMentoringAppliesResponseData {
  mentoringId: number;
  menteeInfo: {
    profileId: number;
    nickname: string;
    employmentStatus: string;
    desiredJob: string;
    disability: string;
    severity: string;
    imgUrl: string;
  };
  applicationDate: string;
  applicationReason: string;
  datePassed?:boolean;
  mentoringStatus?:string;
}

export interface GetMonthlyMentoringsResponse {
  month: string;
  monthlyMentoringMembers: DailyMentoringMember[];
}

export interface GetDailyMentoringsResponse {
  date: string;
  mentoringMembers: MentoringMember[];
}

export interface GetTodayMentoringsResponse {
  applicationDate: string;
  mentorInfo: Mentor;
}
