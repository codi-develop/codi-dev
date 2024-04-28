'use client';

import ProfileImage from '@icons/common/profile-image.svg';
import Search from '@icons/common/search.svg';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { FormContainer } from '@/ui/atoms/Container';
import Typography from '@/ui/atoms/Typography';
import theme, { device } from '@/ui/theme';
import IconInputContainer from '@/ui/molecules/Input/IconInput';
import Input from '@/ui/atoms/Input';
import Button from '@/ui/atoms/Button';
import Dropdown from '@/ui/atoms/Dropdown';
import FlexBox from '@/ui/atoms/FlexBox';
import useUploadFile from '@/hooks/useUploadFile';
import {
  DISABILITIES,
  EMPLOYMENT_STATUSES,
  EMPLOYMENT_STATUSES_VALUE,
  SEVERITIES,
} from '@/constants';
import {
  editProfile as patchEditProfile,
  registerProfile as postRegisterProfile,
} from '@/api/profileApi';
import { handleApiCallback } from '@/utils/api';
import JobSelector from '@/components/Job/JobSelector/JobSelector';
import { selectUser, setUser } from '@/features/user/userSlice';
import { RegisterProfileResponse } from '@/types/api/profile';
import Label from '@/ui/atoms/Label';
import useGetProfileQuery from '@/queries/profileQuery';
import LabelBox from '@/ui/molecules/LabelBox';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';
import { ValidateSchema } from '@/types/validate';
import useNewForm from '@/hooks/useNewForm/useNewForm';
import FormErrorContainer from '@/ui/molecules/Form/FormErrorContainer';
import FormInput from '@/ui/molecules/Form/FormInput';
import FormTextarea from '@/ui/molecules/Form/FormTextarea';
//test
function ProfileFormPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isEdit = useSearchParams().get('edit');
  const formData = new FormData();

  const { id: memberId } = useSelector(selectUser)!;
  const { data, isFetching } = useGetProfileQuery();

  const initFormValues = {
    introduction: '',
    desiredJob: '',
    job: '',
    education: '',
    disability: '',
    employmentStatus: '',
    severity: '중증',
  };

  const validationSchema: ValidateSchema = {
    introduction: {
      required: {
        message: '자기소개를 입력해주세요.',
      },
      minLength: {
        message: '50자 이상 입력해주세요.',
        value: 50,
      },
    },
    desiredJob: {
      required: {
        message: '희망 직무를 입력해주세요.',
      },
    },
    job: {
      required: {
        message: '직무 카테고리를 선택해주세요.',
      },
    },
    disability: {
      required: {
        message: '장애 분류를 선택해주세요.',
      },
    },
    employmentStatus: {
      required: {
        message: '취업 상태를 입력해주세요',
      },
    },
  };

  const {
    form,
    handleFormValueChange,
    errors,
    validateAll,
    isInvalid,
    setIsFormSubmitted,
  } = useNewForm(initFormValues, validationSchema, data!);

  const { file, onUploadFile } = useUploadFile();
  const [bigEducationCategory, setBigEducationCategory] = useState('');
  const [job, setJob] = useState('');
  const [openJobSelector, setOpenJobSelector] = useState(false);
  const [submitType, setSubmitType] = useState<string>('');

  useEffect(() => {
    if (isEdit && data) {
      const { job, education } = data;
      setJob(job!);
      if (education === ('초등학교' || '중학교' || '고등학교')) {
        setBigEducationCategory(education);
        form.education = '';
      }
    }
  }, [isFetching]);

  const processData = () => {
    if (bigEducationCategory !== '대학교' && bigEducationCategory) {
      form.education = bigEducationCategory;
    }

    form.employmentStatus = EMPLOYMENT_STATUSES_VALUE.get(
      form.employmentStatus,
    );
  };

  const createFormData = () => {
    const blob = new Blob([JSON.stringify(form)], {
      type: 'application/json',
    });

    formData.append('profile', blob);
    formData.append('file', file.data!);
    const imageFormData = new FormData();
    imageFormData.append('file', file.data!);
  };

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    const isFormValid = validateAll();

    if (isFormValid) {
      processData();
      createFormData();
      if (isEdit) {
        await editProfile();
      } else await registerProfile();
    }
  };

  const registerProfile = async () => {
    const { data, status, errorMessage } =
      await postRegisterProfile<RegisterProfileResponse>(formData);

    handleApiCallback(
      status!,
      () => apiSuccessCallback('register', data!),
      () =>
        alert(
          `프로필 등록이 실패하였습니다. 다시 시도해주세요. error message : ${errorMessage}`,
        ),
    );
  };

  const editProfile = async () => {
    const { data, status, errorMessage } =
      await patchEditProfile<RegisterProfileResponse>(formData);

    handleApiCallback(
      status!,
      () => apiSuccessCallback('edit', data!),
      () =>
        alert(
          `프로필 수정이 실패하였습니다. 다시 시도해주세요. error message : ${errorMessage}`,
        ),
    );
  };

  const apiSuccessCallback = (
    type: 'register' | 'edit',
    data: RegisterProfileResponse,
  ) => {
    const { imgUrl } = data;

    dispatch(setUser({ profileImage: imgUrl }));

    if (type === 'register') {
      if (submitType === 'complete') {
        router.push('/');
        return;
      }
      router.push('/mentorRegisterForm');
      return;
    }

    router.back();
  };

  useEffect(() => {
    // searchUniv();
  }, []);

  return (
    <SinglePageLayout background={theme.colors.white}>
      <FormContainer>
        <Typography
          variant="h1"
          size={theme.fonts.size.lg}
          weight={theme.fonts.weight.black}
          align="center"
          {...{ marginBottom: '80px' }}
        >
          {isEdit ? '프로필 수정하기' : '프로필 작성하기'}
        </Typography>
        <form onSubmit={(e) => handleProfileSubmit(e)}>
          <FlexBox direction="column" rowGap="50px">
            <LabelBox text="프로필 사진" helpText="(선택)">
              <FlexBox justifyContent="space-between">
                <IconInputContainer iconComponent={<ProfileImage />}>
                  <Input outline disabled value={file.name} />
                  <div style={{ display: 'none' }}>
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
                  onClick={() =>
                    document.getElementById('profileImage')?.click()
                  }
                  {...{ marginLeft: '10px' }}
                >
                  {isEdit && data?.imgUrl ? '수정하기' : '등록하기'}
                </Button>
              </FlexBox>
            </LabelBox>
            <LabelBox text="장애 분류">
              <FlexBox direction="column" rowGap="10px">
                <FlexBox columnGap="10px">
                  <Label htmlFor="disability" text="장애 분류" />
                  <FormErrorContainer errorMessage={errors?.disability!}>
                    <Dropdown
                      id="disability"
                      invalid={isInvalid('disability')}
                      width="100%"
                      type="form"
                      title="소분류"
                      categories={DISABILITIES}
                      selectedCategory={form.disability!}
                      setSelectedCategory={(disability) =>
                        handleFormValueChange<string>({
                          name: 'disability',
                          value: disability,
                        })
                      }
                    />
                  </FormErrorContainer>
                </FlexBox>
              </FlexBox>
            </LabelBox>
            <LabelBox text="중증도">
              <FlexBox justifyContent="space-between">
                {SEVERITIES.map((severity) => (
                  <Button
                    id={severity}
                    key={severity}
                    width="50%"
                    type="button"
                    color={
                      form.severity === severity
                        ? theme.colors.primary.main
                        : theme.colors.white
                    }
                    variant="square"
                    outline
                    {...{
                      ':first-child': {
                        marginRight: '10px',
                      },
                    }}
                    onClick={() =>
                      handleFormValueChange({
                        name: 'severity',
                        value: severity,
                      })
                    }
                  >
                    {severity}
                  </Button>
                ))}
              </FlexBox>
            </LabelBox>
            <LabelBox text="학력" helpText="(선택)">
              <FlexBox columnGap="10px">
                <Label
                  htmlFor="bigEducation"
                  text="최종 학력 (선택사항입니다)"
                />
                <Dropdown
                  id="bigEducation"
                  width="40%"
                  type="form"
                  title="최종 학력"
                  selectedCategory={bigEducationCategory}
                  setSelectedCategory={(bigEducation) =>
                    setBigEducationCategory(bigEducation)
                  }
                  categories={['초등학교', '중학교', '고등학교', '대학교']}
                />
                <IconInputContainer iconComponent={<Search />}>
                  <Label htmlFor="education" text="대학교 입력" />
                  <Input
                    disabled={bigEducationCategory !== '대학교'}
                    id="education"
                    name="education"
                    placeholder="학교명 검색"
                    value={form.education}
                    outline
                    onChange={handleFormValueChange}
                  />
                </IconInputContainer>
              </FlexBox>
            </LabelBox>
            <LabelBox text="희망 직무">
              <FlexBox
                columnGap="10px"
                {...{
                  [device('tablet')]: {
                    flexDirection: 'column',
                    rowGap: '10px',
                  },
                }}
              >
                <Label htmlFor="job" text="직무 분류" />
                <FormErrorContainer errorMessage={errors?.job!}>
                  <JobSelector
                    id="job"
                    invalid={isInvalid('job')}
                    selected={form.job}
                    setSelected={(job) =>
                      handleFormValueChange({ name: 'job', value: job })
                    }
                    open={openJobSelector}
                    setOpen={setOpenJobSelector}
                    width="100%"
                  />
                </FormErrorContainer>
                <Label htmlFor="desiredJob" text="희망 직무" />
                <FormInput
                  id="desiredJob"
                  name="desiredJob"
                  value={form.desiredJob}
                  outline
                  maxLength={10}
                  width="100%"
                  placeholder="정확한 직무를 입력해주세요. 10자 내외."
                  onChange={handleFormValueChange}
                  invalid={isInvalid('desiredJob')}
                  {...{
                    [device('tablet')]: {
                      width: '100%',
                    },
                  }}
                  errorMessage={errors?.desiredJob}
                />
              </FlexBox>
            </LabelBox>
            <LabelBox text="취업 상태">
              <Label htmlFor="employmentStatus" text="취업 상태" />
              <FormErrorContainer errorMessage={errors?.employmentStatus!}>
                <Dropdown
                  id="employmentStatus"
                  width="40%"
                  type="form"
                  title="선택"
                  selectedCategory={form.employmentStatus!}
                  setSelectedCategory={(employmentStatus) =>
                    handleFormValueChange({
                      name: 'employmentStatus',
                      value: employmentStatus,
                    })
                  }
                  invalid={isInvalid('employmentStatus')}
                  categories={EMPLOYMENT_STATUSES}
                />
              </FormErrorContainer>
            </LabelBox>
            <LabelBox text="자기 소개">
              <Label htmlFor="introduction" text="자기 소개" />
              <FormTextarea
                id="introduction"
                name="introduction"
                placeholder="최소 50 글자"
                value={form.introduction}
                onChange={handleFormValueChange}
                invalid={isInvalid('introduction')}
                errorMessage={errors?.introduction!}
              />
            </LabelBox>
            <FlexBox
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowGap="16px"
            >
              <Button
                onClick={() => {
                  setSubmitType('complete');
                }}
                width="100%"
                type="submit"
                variant="square"
              >
                작성완료
              </Button>
              {!isEdit && (
                <Button
                  onClick={() => {
                    setSubmitType('complete-apply');
                  }}
                  width="100%"
                  type="submit"
                  variant="square"
                >
                  작성하고 멘토 신청하러 가기
                </Button>
              )}
            </FlexBox>
          </FlexBox>
        </form>
      </FormContainer>
    </SinglePageLayout>
  );
}

export default ProfileFormPage;
