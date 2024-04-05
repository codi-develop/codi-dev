import { StyledFloating } from '@/ui/atoms/Floating';
import Button from '@/ui/atoms/Button';
import theme from '@/ui/theme';
import styled from '@emotion/styled';

const ChannelTalkFloating = () => {
  return (
    <S
      variant="round"
      width="110px"
      color={theme.colors.info.main}
      hoverDisabled
      id="channelTalk"
    >
      문의하기
    </S>
  );
};

const S = styled(StyledFloating.OpenButton)(() => ({
  bottom: '150px',
}));
export default ChannelTalkFloating;
