import { ReactNode } from 'react';
import FormError from '../Typography/FormError';
import styled from '@emotion/styled';

export const FormErrorContainer = ({
  errorMessage,
  children,
}: {
  errorMessage: string;
  children: ReactNode;
}) => {
  return (
    <FormInputContainer>
      {children}
      {errorMessage && <FormError>{errorMessage}</FormError>}
    </FormInputContainer>
  );
};

const FormInputContainer = styled.div(({ width }: { width?: string }) => ({
  width: width ?? '100%',
  // position: 'relative',
}));
export default FormErrorContainer;
