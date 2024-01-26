'use client';

import { useRouter } from 'next/navigation';
import signUpCompleteImage from '@images/sign-up-complete.png';
import Container from '@/ui/atoms/Container';
import Typography from '@/ui/atoms/Typography';
import Button from '@/ui/atoms/Button';
import StyledLink from '@/ui/atoms/Link';
import theme from '@/ui/theme';
import FlexBox from '@/ui/atoms/FlexBox';
import ImageComponent from '@/ui/atoms/ImageComponent';

function CompletePage() {
  const router = useRouter();
  return (
    <Container>
      <FlexBox direction="column" alignItems="center" rowGap="20px">
        <div style={{ width: '70%' }}>
          <ImageComponent
            width="100%"
            height="520px"
            src={signUpCompleteImage}
            alt="회원가입 완료"
          />
        </div>

        <Typography variant="div">
          딱 맞는 멘토 매칭을 위해서 조금만 더 알려주세요!
        </Typography>
        <Button
          onClick={() => {
            router.push('/profileForm');
          }}
          variant="default"
          color={theme.colors.primary.main}
        >
          프로필 작성하기
        </Button>
        <StyledLink href="/">나중에 할게요</StyledLink>
      </FlexBox>
    </Container>
  );
}

export default CompletePage;
