export type RegisterMentorBody = {
  career: string;
  company: string;
  inOffice: boolean;
  introduction: string;
  job: string;
  jobName: string;
  mentoringCategories: string;
};

export interface GetMentorsParameters {
  direction?: string;
  job?: string;
  career?: string;
  disability?: string;
  keyword?: string;
}

export interface GetRecommendationMentorsParameters {
  disability?: string;
  firstJob?: string;
  secondJob?: string;
  thirdJob?: string;
}

export interface RegisterMentorResponse {
  id: number;
  fileUrl: string;
  isCertificate: boolean;
  company: string;
  job: string;
  career: string;
  jobName: string;
  inOffice: boolean;
  introduction: string;
  star: number;
  mentees: number;
  mentoringCategories: string[];
}
