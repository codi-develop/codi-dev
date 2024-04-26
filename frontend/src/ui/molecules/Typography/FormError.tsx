import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

const FormError = ({ children }: { children: ReactNode }) => (
  <StyledFormError>
    <Typography color={theme.colors.error} variant="div">
      {children!}
    </Typography>
  </StyledFormError>
);

const StyledFormError = styled.div`
  /* position: absolute;
  bottom: -17px; */
  margin-top: 4px;
`;

export default FormError;
