import { InputProps } from '@/types/ui';
import Input from '@/ui/atoms/Input';
import FormErrorContainer from './FormErrorContainer';

type StyledInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputFinalProps = StyledInputProps & InputProps;

interface FormInputProps extends InputFinalProps {
  errorMessage?: string;
}

const FormInput = (props: FormInputProps) => {
  const { errorMessage } = props;
  return (
    <FormErrorContainer errorMessage={errorMessage!}>
      <Input {...props} />
    </FormErrorContainer>
  );
};

export default FormInput;
