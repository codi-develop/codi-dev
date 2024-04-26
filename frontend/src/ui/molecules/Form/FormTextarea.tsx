import { InputProps } from '@/types/ui';
import FormErrorContainer from './FormErrorContainer';
import Textarea from '@/ui/atoms/Textarea';

type StyledInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type InputFinalProps = StyledInputProps & InputProps;

interface FormTextareaProps extends InputFinalProps {
  errorMessage?: string;
}

const FormTextarea = (props: FormTextareaProps) => {
  const { errorMessage } = props;
  return (
    <FormErrorContainer errorMessage={errorMessage!}>
      <Textarea {...props} />
    </FormErrorContainer>
  );
};

export default FormTextarea;
