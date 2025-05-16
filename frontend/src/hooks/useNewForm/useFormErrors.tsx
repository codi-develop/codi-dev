import { useEffect, useState } from 'react';

export interface FormErrors {
  [key: string]: string;
}

const useFormErrors = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const firstErroryKey =
    errors !== null && errors[0] !== null ? Object.keys(errors)[0] : '';

  const isInvalid = (key: string): boolean => {
    if (errors) return key in errors!;
    return false;
  };

  const updateError = (key: string, errorMessage: string) => {
    setErrors((prev) => ({ ...prev!, [key]: errorMessage! }));
  };

  const deleteError = (key: string) => {
    setErrors((prev) => {
      const copied = { ...prev };
      delete copied[key];
      return copied;
    });
  };

  return {
    errors,
    firstErroryKey,
    isInvalid,
    updateError,
    deleteError,
  };
};
export default useFormErrors;
