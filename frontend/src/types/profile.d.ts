import { ReactNode } from 'react';
import { MentoringPlatform } from './mentoring';

export interface MenteeProfile {
  id?: number;
  nickname?: string;
  imgUrl?: string;
  desiredJob?: string;
  disability?: string;
  severity?: string;
  employmentStatus?: string;
  favorites?: [];
}
export interface Mentor extends MenteeProfile {
  id?: number;
  mentorId?: number;
  career?: string;
  job?: string;
  introduction?: string;
  star?: number;
  mentees?: number;
  applicationDate?: string;
  mentoringCategories?: string[];
  mentoringCount?: number;
  responseRate?: number;
  futureScheduleCount?: number;
}

export interface ProfileCardProps extends Mentor {
  width?: string;
  height?: string;
  mentorId?: number;
  link?: string;
  edit?: boolean;
  isMentorProfile?: boolean;
  isMyPage?: boolean;
  pageQueryInfo?: object;
  favorites?: number[];
  children?: ReactNode;
}
