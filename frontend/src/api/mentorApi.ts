import { GetMentorsParameters, applyMentorBody } from "@/types/api/mentor";
import customAxios from "./customAxios";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils/api";

const applyMentor = async <T>(memberId: string, mentor: FormData) => {
  try {
    const { data, status }: AxiosResponse<T> = await customAxios.post(
      `/mentors/${memberId}`,
      mentor,
      {
        headers: {
          "Content-Type": "multitype/form-data",
        },
      }
    );
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

const getMentors = async (mentorsParams: GetMentorsParameters) => {
  const { page, size, job, career, disability, keyword } = mentorsParams;
  return (
    await customAxios.get(
      `/mentors?page=${page}&size=${size}&job=${job}&careere=${career}&disability=${disability}`
    )
  ).data;
};

const getMentor = async (mentorId: number) => {
  return (await customAxios.get(`/mentors/${mentorId}`)).data!;
};

const likeMentor = async (profileId: number, mentorId: number) => {
  try {
    const { data, status }: AxiosResponse = await customAxios.post(
      `/profiles/${profileId}/favorites/${mentorId}`
    );
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

const unLikeMentor = async (profileId: number, mentorId: number) => {
  try {
    const { data, status }: AxiosResponse = await customAxios.delete(
      `/profiles/${profileId}/favorites/${mentorId}`
    );
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export { applyMentor, getMentors, getMentor, likeMentor, unLikeMentor };
