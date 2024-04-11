'use client';

import { FormEvent, useState } from 'react';
import { findPassword } from '@/api/accountApi';
import Button from '@/ui/atoms/Button';
import Input from '@/ui/atoms/Input';
import FlexBox from '@/ui/atoms/FlexBox';
import Container from '@/ui/atoms/Container';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import useForm, { FormPropertyType, FormType } from '@/hooks/useForm/useForm';
import {
  AccountImageComponent,
  AccountFormContainer,
} from '@/components/pages/account/AccountContainers';
import FindPwImage from '@images/find-pw.png';

function FindPwPage() {
  interface FindPasswordFormValuesType extends FormType {
    email: FormPropertyType<string>;
    id: FormPropertyType<string>;
  }
  const initialFormValues: FindPasswordFormValuesType = {
    email: {
      validCondition: {
        required: true,
        regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      },
    },
    id: {
      validCondition: {
        required: true,
      },
    },
  };

  const { form, handleFormValueChange, validateAllFormValues } =
    useForm(initialFormValues);
  const postFindPw = async () => {
    const { data, status } = await findPassword(
      form.email.value,
      form.id.value,
    );

    if (status === 200) {
      alert('해당 이메일로 임시 비밀번호가 전송되었습니다.');
    } else {
      alert(
        '임시 비밀번호 전송이 실패했습니다. 이메일 주소를 다시 한번 확인해주세요.',
      );
    }
  };

  const handleSubmitFindPwForm = async (e: FormEvent) => {
    e.preventDefault();

    const isFormValid = validateAllFormValues();

    if (isFormValid) await postFindPw();
  };
  return (
    <FlexBox {...{ height: '100%' }}>
      <AccountImageComponent
        width="60%"
        height="auto"
        src={FindPwImage}
        alt="비밀번호 찾기 페이지 입니다."
      />
      <Container width="55.5%">
        <form onSubmit={(e) => handleSubmitFindPwForm(e)}>
          <AccountFormContainer
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowGap="40px"
          >
            <div>
              <Typography
                variant="div"
                size={theme.fonts.size.lg}
                weight={theme.fonts.weight.black}
                align="center"
                {...{ marginBottom: '10px' }}
              >
                비밀번호를 잊어버리셨나요?
              </Typography>
            </div>

            <FlexBox direction="column" rowGap="20px">
              <Input
                id="email"
                name="email"
                value={form.email.value}
                onChange={handleFormValueChange}
                invalid={form.email.isValid === 'invalid'}
                placeholder="이메일을 입력해주세요."
              />
              <Input
                id="id"
                name="id"
                value={form.id.value}
                invalid={form.id.isValid === 'invalid'}
                onChange={handleFormValueChange}
                placeholder="아이디를 입력해주세요."
              />
              <Button type="submit" variant="default" size="small">
                임시 비밀번호 발송하기
              </Button>
            </FlexBox>
          </AccountFormContainer>
        </form>
      </Container>
    </FlexBox>
  );
}

export default FindPwPage;
