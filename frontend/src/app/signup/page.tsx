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
  checkDuplicatedEmail as postcheckDuplicatedEmail,
  signIn,
  signUp,
} from '@/api/signApi';
import { DATE } from '@/constants';

import { handleApiCallback } from '@/utils/api';
import { SignUpBody } from '@/types/api/sign';

import InvisibleLabel from '@/ui/atoms/InvisibleLabel';
import { setIsLoggedIn } from '@/features/auth/authSlice';
import Markdown from 'react-markdown';
import { privateData, useTerm } from '@/components/Terms/terms';
import TermsChecker from '@/components/Terms/TermsChecker';
import LabelBox from '@/ui/molecules/LabelBox';
import { ValidateSchema } from '@/types/validate';
import useNewForm from '@/hooks/useNewForm/useNewForm';
import FormInput from '@/ui/molecules/Form/FormInput';
import { setCurrentModal } from '@/features/modal/modalSlice';
import { validate } from '@/hooks/useNewForm/validate';
import FormErrorContainer from '@/ui/molecules/Form/FormErrorContainer';

const GENDER_LIST = [
  { name: '남자', key: 'MAN' },
  { name: '여자', key: 'WOMAN' },
  { name: '선택하지 않음', key: 'NOT_CHECKED' },
];

function SignUpPage() {
  const initialFormValues = {
    email: '',
    password: '',
  };

  const validationSchema: ValidateSchema = {
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
    validate,
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

  const checkDuplicatedEmail = async () => {
    const { data, status, errorMessage } =
      await postcheckDuplicatedEmail<boolean>(form.email);
    handleApiCallback(
      status!,
      () => setIsIdDuplicated(data),
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
            id: form.email,
            password: form.password,
          });
          if (data) dispatch(setIsLoggedIn(true));
          router.push('/signup/complete');
        },
        () => alert(`호출 실패 : ${errorMessage}`),
      );
    }
  };

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
          <LabelBox text="이메일">
            <FlexBox columnGap="10px">
              <InvisibleLabel htmlFor="email" text="이메일" />
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
              <InvisibleLabel htmlFor="emailType" text="이메일 유형" />
              <Dropdown
                id="emailType"
                selectedCategory={emailType}
                setSelectedCategory={setEmailType}
                width="30%"
                categories={['gmail.com', 'naver.com', 'hanmail.net']}
                title="gmail.com"
                type="form"
              />
              <Button
                onClick={checkDuplicatedEmail}
                width="30%"
                variant="square"
                type="button"
                {...{ marginLeft: '10px' }}
                disabled={isInvalid('id') || form.email === ''}
              >
                중복확인
              </Button>
            </FlexBox>
          </LabelBox>
          <LabelBox
            text="비밀번호"
            helpText="영어, 숫자, 특수기호가 포함된 8자리 이상 비밀번호를 입력해주세요."
          >
            <IconInputContainer iconComponent={<PasswordIcon />}>
              <InvisibleLabel htmlFor="password" text="비밀번호" />
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
