import { useEffect, useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

const useFormErrors = <T extends object>(form: T) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const isInvalid = (key: string) => {
    return key in errors;
  };

  return { errors, setErrors, isInvalid };
};
export default useFormErrors;
