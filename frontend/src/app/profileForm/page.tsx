"use client";

import { FormContainer } from "@/ui/atoms/Container";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import IconInputContainer from "@/ui/molecules/Input/IconInput";
import Input from "@/ui/atoms/Input";
import Button from "@/ui/atoms/Button";
import ProfileImage from "@icons/common/profile-image.svg";
import Dropdown from "@/ui/atoms/Dropdown";
import FlexBox from "@/ui/atoms/FlexBox";
import Search from "@icons/common/search.svg";
import Textarea from "@/ui/atoms/Textarea";
import { FormEvent, useEffect, useState } from "react";
import { searchUniv } from "@/api/signApi";
import useForm from "@/hooks/useForm";
import useUploadFile from "@/hooks/useUploadFile";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DISABILITIES,
  EMPLOYMENT_STATUSES,
  EMPLOYMENT_STATUSES_VALUE,
  SEVERITIES,
} from "@/constants";
import {
  editProfile as patchEditProfile,
  registerProfile as postRegisterProfile,
} from "@/api/profileApi";
import { handleApiCallback } from "@/utils/api";
import JobSelector from "@/components/Job/JopSelector";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "@/features/user/userSlice";
import { setLocalUser, localUser } from "@/utils/tempUser";
import { RegisterProfileResponse } from "@/types/api/profile";
import { useDispatch } from "react-redux";
import ContentTextContainer from "@/ui/molecules/Container/ContentTextContainer";
import Label from "@/ui/atoms/Label";
import useGetProfileQuery from "@/queries/profileQuery";

const ProfileFormPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialFormValues = {
    introduction: "",
    desiredJob: "",
    job: "",
    education: "",
    disability: "",
    employmentStatus: "",
    severity: "중증",
  };

  const isEdit = useSearchParams().get("edit");

  const { id: memberId, profileId } = useSelector(selectUser)!;

  const { data, isFetching } = useGetProfileQuery(profileId!);

  const {
    form,
    setForm,
    validateForm,
    invalid,
    handleFormValueChange,
    formInvalid,
  } = useForm<FormValues>(initialFormValues);

  const { file, onUploadFile } = useUploadFile();
  const [bigEducationCategory, setBigEducationCategory] = useState("");
  const [job, setJob] = useState("");
  const [openJobSelector, setOpenJobSelector] = useState(false);
  const [submitType, setSubmitType] = useState<string>("");

  useEffect(() => {
    if (isEdit) {
      // refetch();
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setForm({
        introduction: data?.introduction!,
        desiredJob: data?.desiredJob!,
        job: data?.job!,
        education: data?.education!,
        disability: data?.disability!,
        employmentStatus: data?.employmentStatus!,
        severity: data?.severity!,
      });

      setJob(data?.job!);
      if (data?.education === ("초등학교" || "중학교" || "고등학교")) {
        setBigEducationCategory(data?.education);
        form.education = "";
      }
    }
  }, [isFetching]);

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formInvalid) return;
    processData();
    createFormData(form);

    if (isEdit) {
      editProfile();
    } else registerProfile();
  };

  const processData = () => {
    if (bigEducationCategory !== "대학교" && bigEducationCategory) {
      form.education = bigEducationCategory;
    }

    form.employmentStatus = EMPLOYMENT_STATUSES_VALUE.get(
      form.employmentStatus
    );
  };

  const createFormData = (form: FormValues) => {
    const formValues = { ...form };
    const blob = new Blob([JSON.stringify(formValues)], {
      type: "application/json",
    });

    formData.append("profile", blob);
    formData.append("file", file.data!);
    const imageFormData = new FormData();
    imageFormData.append("file", file.data!);
  };

  const registerProfile = async () => {
    const { data, status, errorMessage } =
      await postRegisterProfile<RegisterProfileResponse>(memberId!, formData);

    const signInSuccessCallback = () => {
      const { id, imgUrl } = data!;
      setLocalUser({ profileId: id, imgUrl });
      dispatch(setUser(localUser()));
      if (submitType === "complete") {
        router.push("/");
      } else router.push("/mentorRegisterForm");
    };

    handleApiCallback(status!, signInSuccessCallback, () =>
      alert(
        `프로필 등록이 실패하였습니다. 다시 시도해주세요. error message : ${errorMessage}`
      )
    );
  };

  const editProfile = async () => {
    const { data, status, errorMessage } =
      await patchEditProfile<RegisterProfileResponse>(profileId!, formData);

    const signInSuccessCallback = () => {
      const { id, imgUrl } = data!;
      setLocalUser({ profileId: id, imgUrl });
      dispatch(setUser(localUser()));
      router.back();
    };

    handleApiCallback(status!, signInSuccessCallback, () =>
      alert(
        `프로필 수정이 실패하였습니다. 다시 시도해주세요. error message : ${errorMessage}`
      )
    );
  };

  const formData = new FormData();

  useEffect(() => {
    searchUniv();
  }, []);

  useEffect(() => {
    setForm({ ...form, job });
  }, [job]);

  return (
    <FormContainer>
      <Typography
        variant="h1"
        size={theme.fonts.size.lg}
        weight={theme.fonts.weight.black}
        align="center"
        {...{ margin: "80px 0px 80px 0px" }}
      >
        {isEdit ? "프로필 수정하기" : "프로필 작성하기"}
      </Typography>
      <form onSubmit={(e) => handleProfileSubmit(e)}>
        <FlexBox direction="column" rowGap="50px">
          <ContentTextContainer text="프로필 사진" helpText="(선택)">
            <IconInputContainer iconComponent={<ProfileImage />}>
              <Input outline={true} disabled value={file.name} />
              <div style={{ display: "none" }}>
                <Input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={onUploadFile}
                />
              </div>
            </IconInputContainer>
            <Label
              htmlFor="profileImage"
              text="프로필 사진 등록 (선택사항입니다)"
            />
            <Button
              id="profileImage"
              width="30%"
              variant="square"
              type="button"
              onClick={() => document.getElementById("profileImage")?.click()}
              {...{ marginLeft: "10px" }}
            >
              등록하기
            </Button>
          </ContentTextContainer>
          <ContentTextContainer text="장애 분류">
            <FlexBox direction="column" rowGap="10px">
              <FlexBox columnGap="10px">
                <Label htmlFor="disability" text="장애 분류" />
                <Dropdown
                  id="disability"
                  invalid={invalid("disability", { required: true })}
                  width="100%"
                  type="form"
                  title="소분류"
                  categories={DISABILITIES}
                  selectedCategory={form.disability}
                  setSelectedCategory={(disability) =>
                    handleFormValueChange({
                      name: "disability",
                      value: disability,
                    })
                  }
                ></Dropdown>
              </FlexBox>
            </FlexBox>
          </ContentTextContainer>
          <ContentTextContainer text="중증도">
            {SEVERITIES.map((severity) => (
              <Button
                id={severity}
                key={severity}
                width="50%"
                type="button"
                color={
                  form.severity === severity
                    ? theme.colors.primary
                    : theme.colors.white
                }
                variant="square"
                outline
                {...{
                  ":first-child": {
                    marginRight: "10px",
                  },
                }}
                onClick={() =>
                  handleFormValueChange({ name: "severity", value: severity })
                }
              >
                {severity}
              </Button>
            ))}
          </ContentTextContainer>
          <ContentTextContainer text="학력" helpText="(선택)">
            <FlexBox columnGap="10px">
              <Label htmlFor="bigEducation" text="최종 학력 (선택사항입니다)" />
              <Dropdown
                id="bigEducation"
                width="40%"
                type="form"
                title="최종 학력"
                selectedCategory={bigEducationCategory}
                setSelectedCategory={(bigEducation) =>
                  setBigEducationCategory(bigEducation)
                }
                categories={["초등학교", "중학교", "고등학교", "대학교"]}
              />
              <IconInputContainer iconComponent={<Search />}>
                <Label htmlFor="education" text="대학교 입력" />
                <Input
                  disabled={bigEducationCategory !== "대학교"}
                  id="education"
                  name="education"
                  placeholder="학교명 검색"
                  value={form.education}
                  outline
                  onChange={handleFormValueChange}
                />
              </IconInputContainer>
            </FlexBox>
          </ContentTextContainer>
          <ContentTextContainer text="희망 직무">
            <FlexBox columnGap="10px">
              <Label htmlFor="job" text="직무 분류" />
              <JobSelector
                id="job"
                invalid={invalid("job", { required: true })}
                selected={job}
                setSelected={setJob}
                open={openJobSelector}
                setOpen={setOpenJobSelector}
              />
              <Label htmlFor="desiredJob" text="희망 직무" />
              <Input
                id="desiredJob"
                name="desiredJob"
                value={form.desiredJob}
                outline={true}
                maxLength={10}
                width="60%"
                placeholder="정확한 직무를 입력해주세요. 10자 내외."
                onChange={handleFormValueChange}
                invalid={invalid("desiredJob", { required: true })}
              />
            </FlexBox>
          </ContentTextContainer>
          <ContentTextContainer text="취업 상태">
            <Label htmlFor="employmentStatus" text="취업 상태" />
            <Dropdown
              id="employmentStatus"
              width="40%"
              type="form"
              title="선택"
              selectedCategory={form.employmentStatus}
              setSelectedCategory={(employmentStatus) =>
                handleFormValueChange({
                  name: "employmentStatus",
                  value: employmentStatus,
                })
              }
              invalid={invalid("employmentStatus", { required: true })}
              categories={EMPLOYMENT_STATUSES}
            ></Dropdown>
          </ContentTextContainer>
          <ContentTextContainer text="자기 소개">
            <Label htmlFor="introduction" text="자기 소개" />
            <Textarea
              id="introduction"
              name="introduction"
              placeholder="최소 50 글자"
              value={form.introduction}
              onChange={handleFormValueChange}
              invalid={invalid("introduction", {
                required: true,
                min: 50,
              })}
            />
          </ContentTextContainer>
          <Button
            onClick={() => {
              setSubmitType("complete");
              validateForm();
            }}
            width="100%"
            type="submit"
            variant="square"
            color={theme.colors.white}
          >
            작성완료
          </Button>
          {!isEdit && (
            <Button
              onClick={() => {
                setSubmitType("complete-apply");
                validateForm();
              }}
              width="100%"
              type="submit"
              variant="square"
            >
              작성하고 멘토 신청하러 가기
            </Button>
          )}
        </FlexBox>
      </form>
    </FormContainer>
  );
};

interface FormValues {
  introduction: string;
  desiredJob: string;
  job: string;
  education: string;
  employmentStatus: string;
  disability: string;
  severity: string;
}

export default ProfileFormPage;
