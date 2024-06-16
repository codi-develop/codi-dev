import { useEffect, useState } from 'react';
import FilledLike from '@icons/common/filled-like.svg';
import EmptyLike from '@icons/common/empty-like.svg';
import { likeMentor, unLikeMentor } from '@/api/mentorApi';
import Button from '@/ui/atoms/Button';
import theme from '@/ui/theme';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

function Like({
  mentorId,
  mentorName,
  favorites,
}: {
  mentorId?: number;
  mentorName?: string;
  favorites?: number[];
}) {
  const [localFavoriteState, setLocalFavoriteState] = useState(false);
  const router = useRouter();

  const redirectOnNotSignedIn = () => {
    const confirmInstance = confirm(
      '관심 멘토를 등록하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?',
    );
    if (confirmInstance) {
      router.replace('/signin');
    }
  };

  const toggleLikeMentor = async () => {
    if (localFavoriteState) {
      await unLikeMentor(mentorId!);
    } else {
      const res = await likeMentor(mentorId!);
      if (res.status === 401) {
        redirectOnNotSignedIn();

        return;
      }
    }
    setLocalFavoriteState((prev) => !prev);
  };

  useEffect(() => {
    setLocalFavoriteState(favorites?.includes(mentorId!)!);
  }, [favorites]);
  return (
    <StyledLikeButton
      id={mentorId?.toString()}
      onClick={toggleLikeMentor}
      variant="round"
      width="48px"
      color={
        localFavoriteState ? theme.colors.secondary.normal : theme.colors.white
      }
      localFavoriteState={localFavoriteState}
      aria-label={`${mentorName!} 멘토 좋아요 누르기`}
      hoverDisabled
    >
      {localFavoriteState ? <FilledLike /> : <EmptyLike />}
    </StyledLikeButton>
  );
}

const StyledLikeButton = styled(Button)(
  ({ localFavoriteState }: { localFavoriteState: boolean }) => ({
    width: '48px',
    position: 'absolute',
    top: '0px',
    right: '0px',
    border: localFavoriteState ? '' : `2px solid ${theme.colors.gray.main}`,
  }),
);

export default Like;
