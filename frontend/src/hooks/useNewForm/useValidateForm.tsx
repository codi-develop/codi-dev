import { useEffect, useState } from 'react';
import useFormErrors from './useFormErrors';
import { invalid } from './validate';
import { ValidateSchema, ValidateSchemaValue } from '@/types/validate';

const useValidateForm = <T extends { [key: string]: any }>(
  form: T,
  validateSchema: ValidateSchema,
) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { errors, updateError, deleteError, isInvalid, firstErroryKey } =
    useFormErrors();
  const validateAllFormValues = () => {
    for (const validateInfo of Object.entries(validateSchema)) {
      const [key, value] = validateInfo;
      if (invalid(value, validateSchema[key])) {
        setIsFormValid(false);
        return false;
      }

      setIsFormValid(true);
      return true;
    }
  };

  const validate = (key: string, value: any) => {
    const errorMessage = invalid(value, validateSchema[key]);

    if (errorMessage) {
      updateError(key, errorMessage);

      return;
    }
    deleteError(key);
  };

  return {
    validate,
    validateAllFormValues,
    errors,
    isInvalid,
    firstErroryKey,
  };
};

export default useValidateForm;
