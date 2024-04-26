'use client';

import { FormEvent, useEffect, useState } from 'react';
import IdIcon from '@icons/common/id.svg';
import PasswordIcon from '@icons/common/password.svg';
import TagIcon from '@icons/common/tag.svg';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { FormContainer } from '@/ui/atoms/Container';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import Button from '@/ui/atoms/Button';
import IconInputContainer from '@/ui/molecules/Input/IconInput';
import FlexBox from '@/ui/atoms/FlexBox';
import Dropdown from '@/ui/atoms/Dropdown';
import {
  checkDuplicateId as postCheckDuplicateId,
  signIn,
  signUp,
} from '@/api/signApi';
import { DATE } from '@/constants';

import { handleApiCallback } from '@/utils/api';
import { SignUpBody } from '@/types/api/sign';

import Label from '@/ui/atoms/Label';
import { setIsLoggedIn } from '@/features/auth/authSlice';
import Markdown from 'react-markdown';
import { privateData, useTerm } from '@/components/Terms/terms';
import TermsChecker from '@/components/Terms/TermsChecker';
import LabelBox from '@/ui/molecules/LabelBox';
import { ValidateSchema } from '@/types/validate';
import useNewForm from '@/hooks/useNewForm/useNewForm';
import FormInput from '@/ui/molecules/Form/FormInput';
import { setCurrentModal } from '@/features/modal/modalSlice';

const GENDER_LIST = [
  { name: '남자', key: 'MAN' },
  { name: '여자', key: 'WOMAN' },
  { name: '선택하지 않음', key: 'NOT_CHECKED' },
];

function SignUpPage() {
  const initialFormValues = {
    birth: '',
    email: '',
    id: '',
    gender: '선택안함',
    name: '',
    password: '',
  };

  const validationSchema: ValidateSchema = {
    id: {
      required: {
        message: '아이디를 입력해주세요.',
      },
      regex: {
        message: '올바른 아이디 형식이 아닙니다',
        value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,12}$/,
      },
    },
    birth: {
      required: {
        message: '생년월일을 입력해주세요.',
      },
    },
    email: {
      required: { message: '이메일을 입력해주세요' },
    },
    password: {
      required: {
        message: '비밀번호를 입력해주세요.',
      },
      regex: {
        message: '올바른 비밀번호 형식이 아닙니다.',
        value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
      },
    },
    name: {
      required: {
        message: '이름을 입력해주세요.',
      },
    },
  };
  const [emailType, setEmailType] = useState('gmail.com');
  const [gender, setGender] = useState(GENDER_LIST[2]);
  const [birth, setBirth] = useState({
    year: 1990,
    month: 1,
    day: 1,
  });

  const {
    form,
    handleFormValueChange,
    validateAll,
    isInvalid,
    errors,
    setIsFormSubmitted,
    isFormSubmitted,
  } = useNewForm(initialFormValues, validationSchema);

  const [isIdDuplicated, setIsIdDuplicated] = useState<Boolean | undefined>(
    undefined,
  );

  const router = useRouter();
  const [checkUserTerm, setCheckUserTerm] = useState(false);
  const [checkPrivateDataTerm, setCheckPrivateDataTerm] = useState(false);

  const checkDuplicateId = async () => {
    const { data, status, errorMessage } = await postCheckDuplicateId<boolean>(
      form.id,
    );
    handleApiCallback(
      status!,
      () => setIsIdDuplicated(data === true),
      () => alert(`호출 실패 : ${errorMessage}`),
    );
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    setIsFormSubmitted(true);
    e.preventDefault();

    const isValid = validateAll();

    if (!checkUserTerm || !checkPrivateDataTerm) {
      return;
    }

    if (isValid) {
      const { status, errorMessage } = await signUp({
        ...form,
        email: `${form.email}@${emailType}`,
      } as SignUpBody);

      handleApiCallback(
        status!,
        async () => {
          const { data } = await signIn({
            id: form.id,
            password: form.password,
          });
          if (data) dispatch(setIsLoggedIn(true));
          router.push('/signup/complete');
        },
        () => alert(`호출 실패 : ${errorMessage}`),
      );
    }
  };

  useEffect(() => {
    handleFormValueChange({ name: 'gender', value: gender.key });
  }, [gender]);

  useEffect(() => {
    const { year, month, day } = birth;
    const stringifiedBirth = `${year}/${month < 10 ? '0' : ''}${month}/${
      day < 10 ? '0' : ''
    }${day}`;
    handleFormValueChange({ name: 'birth', value: stringifiedBirth });
  }, [birth]);

  return (
    <FormContainer>
      <Typography
        variant="h1"
        size={theme.fonts.size.lg}
        weight={theme.fonts.weight.black}
        align="center"
        {...{ margin: '80px 0px 80px 0px' }}
      >
        새로운 계정 생성
      </Typography>

      <form onSubmit={(e) => handleSubmit(e)}>
        <FlexBox direction="column" rowGap="50px">
          <LabelBox
            text="아이디"
            helpText="영어, 숫자를 포함, 특수문자를 제외한 4 - 12 자리의 아이디를 입력해주세요."
          >
            <FlexBox direction="column" alignItems="flex-start" rowGap="10px">
              <FlexBox>
                <IconInputContainer iconComponent={<IdIcon />}>
                  <Label htmlFor="id" text="아이디" />
                  <FormInput
                    id="id"
                    name="id"
                    onChange={handleFormValueChange}
                    value={form.id}
                    invalid={
                      isInvalid('id') ||
                      (isInvalid('id') && isIdDuplicated === true)
                    }
                    outline
                    errorMessage={errors?.id}
                  />
                </IconInputContainer>

                <Button
                  onClick={checkDuplicateId}
                  width="30%"
                  variant="square"
                  type="button"
                  {...{ marginLeft: '10px' }}
                  disabled={isInvalid('id')}
                >
                  중복확인
                </Button>
              </FlexBox>
              <div>
                {isIdDuplicated === true &&
                  '아이디가 중복되었습니다. 다른 아이디를 입력해주세요.'}
                {isIdDuplicated === false && '사용할 수 있는 아이디 입니다.'}
              </div>
            </FlexBox>
          </LabelBox>

          <LabelBox
            text="비밀번호"
            helpText="영어, 숫자, 특수기호가 포함된 8자리 이상 비밀번호를 입력해주세요."
          >
            <IconInputContainer iconComponent={<PasswordIcon />}>
              <Label htmlFor="password" text="비밀번호" />
              <FormInput
                id="password"
                name="password"
                onChange={handleFormValueChange}
                value={form.password}
                invalid={isInvalid('password')}
                type="password"
                outline
                errorMessage={errors?.password}
              />
            </IconInputContainer>
          </LabelBox>
          <LabelBox text="이름">
            <IconInputContainer iconComponent={<TagIcon />}>
              <Label htmlFor="name" text="이름" />
              <FormInput
                id="name"
                name="name"
                onChange={handleFormValueChange}
                value={form.name}
                invalid={isInvalid('name')}
                outline
                errorMessage={errors?.name}
              />
            </IconInputContainer>
          </LabelBox>

          <LabelBox text="성별">
            <FlexBox columnGap="10px">
              {GENDER_LIST.map((genderType) => (
                <Button
                  key={genderType.key}
                  onClick={() => setGender(genderType)}
                  width="100%"
                  variant="square"
                  color={
                    genderType.name === gender.name
                      ? theme.colors.primary.main
                      : theme.colors.white
                  }
                  type="button"
                  outline
                >
                  {genderType.name}
                </Button>
              ))}
            </FlexBox>
          </LabelBox>

          <LabelBox text="생년 월일">
            <FlexBox columnGap="10px">
              <Label htmlFor="birthYear" text="생년월일 연도" />
              <Dropdown
                id="birthYear"
                width="100%"
                categories={DATE.YEARS}
                selectedCategory={birth.year!}
                setSelectedCategory={(year) => setBirth({ ...birth, year })}
                title="연도"
              />
              <Label htmlFor="birthMonth" text="생년월일 월" />
              <Dropdown
                id="birthMonth"
                width="100%"
                categories={DATE.MONTHS}
                selectedCategory={birth.month!}
                setSelectedCategory={(month) => setBirth({ ...birth, month })}
                title="월"
              />
              <Label htmlFor="birthDay" text="생년월일 일" />
              <Dropdown
                id="birthDay"
                width="100%"
                categories={DATE.DAYS}
                selectedCategory={birth.day!}
                setSelectedCategory={(day) => setBirth({ ...birth, day })}
                title="일"
              />
            </FlexBox>
          </LabelBox>
          <LabelBox text="이메일">
            <FlexBox columnGap="10px">
              <Label htmlFor="email" text="이메일" />
              <FormInput
                id="email"
                name="email"
                onChange={handleFormValueChange}
                value={form.email}
                invalid={isInvalid('email')}
                outline
                errorMessage={errors?.email}
              />
              @
              <Label htmlFor="emailType" text="이메일 유형" />
              <Dropdown
                id="emailType"
                selectedCategory={emailType}
                setSelectedCategory={setEmailType}
                width="30%"
                categories={['gmail.com', 'naver.com', 'hanmail.net']}
                title="gmail.com"
                type="form"
              />
            </FlexBox>
          </LabelBox>
          <LabelBox text="이용약관">
            <FlexBox direction="column" rowGap="15px">
              <TermsChecker
                text="코디 이용약관에 동의합니다."
                check={checkUserTerm}
                setChecked={setCheckUserTerm}
                content={useTerm}
                submitted={isFormSubmitted}
              />
              <TermsChecker
                text="개인정보 처리 방침에 동의합니다."
                check={checkPrivateDataTerm}
                setChecked={setCheckPrivateDataTerm}
                content={privateData}
                submitted={isFormSubmitted}
              />
            </FlexBox>
          </LabelBox>
          <Button width="100%" variant="square" type="submit">
            가입완료
          </Button>
        </FlexBox>
      </form>
    </FormContainer>
  );
}

export default SignUpPage;

{
  /* <FlexBox justifyContent="space-between" columnGap="10px">
          <Button variant="square" type="button" width="100%">
            인증번호 전송
          </Button>
            <Input
              value={emailCode}
              onChange={(e) => setEmailCode(e.target)}
              outline
            />
            <Button width="30%" variant="square">
              인증
            </Button>
          </FlexBox> */
}
