'use client';

import PrimaryLogo from '@icons/logo/logo-primary.svg';
import SecondaryLogo from '@icons/logo/logo-secondary.svg';
import Link from 'next/link';
import { ChangeEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import theme, { device } from '@/ui/theme';
import Button from '@/ui/atoms/Button';
import StyledLink from '@/ui/atoms/Link';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import Container from '@/ui/atoms/Container';
import Input from '@/ui/atoms/Input';
import { signIn } from '@/api/signApi';
import usePressEnterKey from '@/hooks/usePressEnterKey';
import { setIsLoggedIn } from '@/features/auth/authSlice';
import { User } from '@/types/user';
import {
  AccountImageComponent,
  AccountFormContainer,
} from '@/components/pages/account/AccountContainers';
import ImageComponent from '@/ui/atoms/ImageComponent';
import signInImage from '@images/signin-image.png';

function SignInPage() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    id: '',
    password: '',
  });
  const dispatch = useDispatch();
  const login = async () => {
    const { data, status } = await signIn<User>(loginInfo);

    if (status === 200) {
      const { id } = data!;
      dispatch(setIsLoggedIn(id !== undefined));
      router.push('/');
    } else {
      alert('로그인이 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  const signInButtonRef = useRef<HTMLButtonElement>(null);
  usePressEnterKey(signInButtonRef);

  return (
    <FlexBox {...{ height: '100%' }}>
      <AccountImageComponent
        width="60%"
        height="auto"
        src={signInImage}
        alt="로그인 페이지 입니다."
      />

      <Container width="55.5%">
        <AccountFormContainer
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowGap="40px"
        >
          <FlexBox justifyContent="center">
            <PrimaryLogo width="200px" height="50px" />
          </FlexBox>
          <FlexBox
            direction="column"
            rowGap="20px"
            {...{ margin: '40px 0px 32px 0px' }}
          >
            <SignInInput
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLoginInfo({ ...loginInfo, id: e.target.value })
              }
              placeholder="아이디를 입력해주세요"
            />
            <SignInInput
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <Button
              ref={signInButtonRef}
              onClick={login}
              width="100%"
              variant="square"
              size="big"
            >
              로그인
            </Button>
          </FlexBox>
          <FlexBox justifyContent="space-between" {...{ marginBottom: '80px' }}>
            <FlexBox width="60%" columnGap="20px" justifyContent="flex-start">
              <StyledLink color={theme.colors.gray.dark} href="/account/findId">
                아이디 찾기
              </StyledLink>
              <div style={{ color: theme.colors.gray.dark }}>|</div>
              <StyledLink color={theme.colors.gray.dark} href="/account/findPw">
                비밀번호 찾기
              </StyledLink>
            </FlexBox>
            {/* <SignInTextButton variant="default">로그인 유지</SignInTextButton> */}
          </FlexBox>
          <FlexBox justifyContent="center">
            <Typography
              variant="span"
              color={theme.colors.gray.dark}
              {...{ marginRight: '10px' }}
            >
              아직 아이디가 없으신가요?
            </Typography>
            <Link href="/signup">회원가입</Link>
          </FlexBox>
        </AccountFormContainer>
      </Container>
    </FlexBox>
  );
}

const SignInInput = styled(Input)`
  height: 70px;
  background-color: ${theme.colors.gray.light};
  font-size: ${theme.fonts.size.md};
`;

export default SignInPage;
