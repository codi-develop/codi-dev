'use client';

import ProfileImage from '@icons/common/profile-image.svg';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import IconInputContainer from '@/ui/molecules/Input/IconInput';
import Input from '@/ui/atoms/Input';
import { FormContainer } from '@/ui/atoms/Container';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme, { device } from '@/ui/theme';
import Button from '@/ui/atoms/Button';
import Dropdown from '@/ui/atoms/Dropdown';
import Checkbox from '@/ui/atoms/Checkbox';
import Textarea from '@/ui/atoms/Textarea';
import useUploadFile from '@/hooks/useUploadFile';
import MentoringCategoriesSelector, {
  MENTOR_CATEGORIES,
} from '@/components/Mentoring/MentoringCategory/MentoringCategoriesSelector';
import {
  registerMentor as postRegisterMentor,
  editMentor as patchEditMentor,
} from '@/api/mentorApi';
import JobSelector from '@/components/Job/JobSelector/JobSelector';
import { handleApiCallback } from '@/utils/api';
import { CAREERS } from '@/constants';
import { useGetMentorQuery } from '@/queries/mentorQuery';
import LabelBox from '@/ui/molecules/LabelBox';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';
import { ValidateSchema } from '@/types/validate';
import useNewForm from '@/hooks/useNewForm/useNewForm';
import FormInput from '@/ui/molecules/Form/FormInput';
import FormErrorContainer from '@/ui/molecules/Form/FormErrorContainer';
import FormTextarea from '@/ui/molecules/Form/FormTextarea';
import { selectUser } from '@/features/user/userSlice';
import { useSelector } from 'react-redux';

function MentorRegisterForm() {
  const router = useRouter();

  const { file, onUploadFile } = useUploadFile();
  const isEdit = useSearchParams().get('edit');
  const [openJobSelector, setOpenJobSelector] = useState(false);
  const formData = new FormData();

  const initialFormValues = {
    introduction: '',
    job: '',
    career: '',
    mentoringCategories: ['면접대비'],
  };

  const validationSchema: ValidateSchema = {
    introduction: {
      required: {
        message: '자기 소개를 입력해주세요.',
      },
      minLength: {
        message: '최소 50자 이상 입력해주세요.',
        value: 50,
      },
    },
    job: {
      required: {
        message: '직무를 입력해주세요.',
      },
    },
    career: {
      required: {
        message: '경력을 입력해주세요.',
      },
    },
    mentoringCategories: {
      required: {
        message: '카테고리를 입력해주세요.',
      },
    },
  };

  const isMentor = useSelector(selectUser).isMentor;

  const { data } = useGetMentorQuery({ isMentor });

  const {
    form,
    handleFormValueChange,
    validateAllFormValues,
    isInvalid,
    errors,
    setIsFormSubmitted,
  } = useNewForm(
    initialFormValues,
    validationSchema,
    isEdit ? data : undefined,
  );

  const processData = () => {
    form.mentoringCategories = [
      ...MENTOR_CATEGORIES?.filter((category) =>
        form.mentoringCategories.includes(category.text),
      ).map((category) => category.value),
    ];
  };

  const createFormData = () => {
    const blob = new Blob([JSON.stringify(form)], {
      type: 'application/json',
    });
    formData.append('mentor', blob);
    formData.append('file', file.data!);
  };

  const handleMentorProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    const isFormValid = validateAllFormValues();

    if (isFormValid) {
      processData();
      createFormData();

      if (isEdit) await editMentor();
      else await registerMentor();
    }
  };

  const registerMentor = async () => {
    const { status } = await postRegisterMentor(formData);

    handleApiCallback(
      status!,
      () => {
        router.push('/');
      },
      () => {
        alert(`멘토 등록이 실패하였습니다. 다시 시도해주세요.`);
      },
    );
  };

  const editMentor = async () => {
    const { status } = await patchEditMentor(formData);
    handleApiCallback(
      status!,
      () => {
        router.back();
      },
      () => {
        alert(`멘토 수정이 실패하였습니다. 다시 시도해주세요.`);
      },
    );
  };

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
          {isEdit ? '멘토 프로필 수정하기' : '멘토 신청하기'}
        </Typography>

        <form onSubmit={(e) => handleMentorProfileSubmit(e)}>
          <FlexBox direction="column" rowGap="50px">
            <LabelBox
              labelColor={theme.colors.secondary.normal}
              text="직무 및 경력"
            >
              <FlexBox direction="column" rowGap="14px">
                <FlexBox
                  justifyContent="space-between"
                  columnGap="10px"
                  {...{
                    [device('tablet')]: {
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      rowGap: '8px',
                    },
                  }}
                >
                  <FlexBox
                    justifyContent="flex-start"
                    width="80%"
                    columnGap="10px"
                    {...{
                      [device('tablet')]: {
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        rowGap: '8px',
                      },
                    }}
                  >
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
                        {...{
                          [device('tablet')]: {
                            width: '100% !important',
                          },
                        }}
                      />
                    </FormErrorContainer>
                    <FormErrorContainer errorMessage={errors?.career!}>
                      <Dropdown
                        id="career"
                        width="100%"
                        type="form"
                        title="경력"
                        categories={CAREERS}
                        selectedCategory={form.career}
                        setSelectedCategory={(career) =>
                          handleFormValueChange({
                            name: 'career',
                            value: career,
                          })
                        }
                        invalid={isInvalid('career')}
                        {...{
                          [device('tablet')]: {
                            width: '100% !important',
                          },
                        }}
                      />
                    </FormErrorContainer>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            </LabelBox>

            {/* <LabelBox
              text="재직증명서 제출"
              helpText="(선택)"
              labelColor={theme.colors.secondary.normal}
            >
              <FlexBox columnGap="8px">
                <IconInputContainer iconComponent={<ProfileImage />}>
                  <Input disabled outline value={file.name} />
                  <div style={{ display: 'none' }}>
                    <Input
                      id="certificate"
                      type="file"
                      accept="application/pdf,.png,.jpg,.jpeg"
                      onChange={onUploadFile}
                    />
                  </div>
                </IconInputContainer>
                <Button
                  onClick={() =>
                    document.getElementById('certificate')?.click()
                  }
                  type="button"
                  variant="square"
                  {...{ minWidth: 'fit-content' }}
                >
                  {isCertificate ? '수정하기' : '등록하기'}
                </Button>
              </FlexBox>
            </LabelBox> */}
            <LabelBox text="멘토링분야" helpText="(1 - 4개)">
              <MentoringCategoriesSelector
                id="mentoringCategories"
                mentoringCategories={form.mentoringCategories}
                setMentoringCategories={(category) =>
                  handleFormValueChange({
                    name: 'mentoringCategories',
                    value: category,
                  })
                }
              />
            </LabelBox>
            <LabelBox
              text="자기 소개"
              labelColor={theme.colors.secondary.normal}
            >
              <FormTextarea
                id="introduction"
                name="introduction"
                placeholder="최소 50 글자"
                outline
                onChange={handleFormValueChange}
                value={form.introduction}
                invalid={isInvalid('introduction')}
                errorMessage={errors?.introduction}
              />
            </LabelBox>
            <Button width="100%" variant="square" type="submit">
              저장
            </Button>
          </FlexBox>
        </form>
      </FormContainer>
    </SinglePageLayout>
  );
}

export default MentorRegisterForm;
