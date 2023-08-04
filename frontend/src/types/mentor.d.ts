import { Mentee } from "./mentee";

export type RegisterMentorData = {
  company: string;
  fileUrl: string;
  id: number;
  introduction: string;
  job: string;
};

export interface GetMentorsParameters {
  direction?: string;
  job?: string;
  page: number;
  size: number;
  career?: string;
  disability?: string;
  keyword?: string;
}

export interface GetMentorsReponse {
  data: Mentor[];
  pageInfo: PageInfo;
}

export interface Mentor extends Mentee {
  mentorId?: number;
  name?: string;
  job?: string;
  isCertificate?: boolean;
  favorite?: string;
  star?: number;
  mentees?: number;
}

export interface ProfileCard extends Mentor {
  width?: string;
  height?: string;
  edit?: boolean;
  mentor?: boolean;
  apply?: boolean;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
