import { useEffect, useState } from 'react';

export interface FormErrors {
  [key: string]: string;
}

const useFormErrors = () => {
  const [errors, setErrors] = useState<FormErrors | null>(null);
  const firstErroryKey =
    errors !== null && errors[0] !== null ? Object.keys(errors)[0] : '';

  const isInvalid = (key: string): boolean => {
    if (errors) return key in errors!;
    return false;
  };

  return {
    errors,
    setErrors,
    firstErroryKey,
    isInvalid,
  };
};
export default useFormErrors;
