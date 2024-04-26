import { useEffect, useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

const useFormErrors = <T extends object>(form: T) => {
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const isInvalid = (key: string) => {
    if (errors) return key in errors!;
    return undefined;
  };

  return { errors, setErrors, isInvalid };
};
export default useFormErrors;
