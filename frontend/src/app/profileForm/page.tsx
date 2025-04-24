'use client';

import ProfileImage from '@icons/common/profile-image.svg';
import Search from '@icons/common/search.svg';
import { FormEvent, useEffect, useRef, useState } from 'react';
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
import InvisibleLabel from '@/ui/atoms/InvisibleLabel';
import useGetProfileQuery from '@/queries/profileQuery';
import LabelBox from '@/ui/molecules/LabelBox';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';
import { ValidateSchema } from '@/types/validate';
import useNewForm from '@/hooks/useNewForm/useNewForm';
import FormErrorContainer from '@/ui/molecules/Form/FormErrorContainer';
import FormInput from '@/ui/molecules/Form/FormInput';

function ProfileFormPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isEdit = useSearchParams().get('edit');
  const formData = new FormData();

  const { id: memberId } = useSelector(selectUser)!;
  const { data, isFetching } = useGetProfileQuery();

  const initFormValues = {
    nickname: '',
    desiredJob: '',
    disability: '',
    employmentStatus: '',
    severity: '중증',
  };

  const validationSchema: ValidateSchema = {
    nickname: {
      required: {
        message: '닉네임을 입력해주세요',
      },
    },
    desiredJob: {
      required: {
        message: '희망 직무를 입력해주세요.',
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
    handleFormElementRef,
  } = useNewForm(initFormValues, validationSchema, data!);

  const { file, onUploadFile } = useUploadFile();
  const [openJobSelector, setOpenJobSelector] = useState(false);
  const [submitType, setSubmitType] = useState<string>('');

  const processData = () => {
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
            <LabelBox text="별명">
              <FormInput
                id="nickname"
                name="nickname"
                value={form.nickname}
                outline
                maxLength={10}
                width="100%"
                placeholder="별명을 입력해주세요. 10자 내외."
                onChange={handleFormValueChange}
                invalid={isInvalid('nickname')}
                {...{
                  [device('tablet')]: {
                    width: '100%',
                  },
                }}
                ref={(el) => {
                  handleFormElementRef(el!, 'nickname');
                }}
                errorMessage={errors?.nickname}
              />
            </LabelBox>
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
                <InvisibleLabel
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
                  <InvisibleLabel htmlFor="disability" text="장애 분류" />
                  <FormErrorContainer
                    ref={(el) => {
                      handleFormElementRef(el!, 'disability');
                    }}
                    errorMessage={errors?.disability!}
                  >
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
                        ? theme.colors.primary.normal
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
                <InvisibleLabel htmlFor="job" text="직무 분류" />
                <FormErrorContainer
                  ref={(el) => handleFormElementRef(el!, 'desiredJob')}
                  errorMessage={errors?.job!}
                >
                  <JobSelector
                    id="job"
                    invalid={isInvalid('job')}
                    selected={form.desiredJob}
                    setSelected={(desiredJob) =>
                      handleFormValueChange({
                        name: 'desiredJob',
                        value: desiredJob,
                      })
                    }
                    open={openJobSelector}
                    setOpen={setOpenJobSelector}
                    width="100%"
                  />
                </FormErrorContainer>
                <InvisibleLabel htmlFor="desiredJob" text="희망 직무" />
              </FlexBox>
            </LabelBox>

            <LabelBox text="취업 상태">
              <InvisibleLabel htmlFor="employmentStatus" text="취업 상태" />
              <FormErrorContainer
                ref={(el) => {
                  handleFormElementRef(el!, 'employmentStatus');
                }}
                errorMessage={errors?.employmentStatus!}
              >
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
