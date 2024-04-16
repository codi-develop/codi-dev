import { useEffect, useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

const useFormErrors = <T extends object>(form: T) => {
  const [errors, setErrors] = useState<FormErrors>({});

  return { errors, setErrors };
};
export default useFormErrors;
