import { useEffect, useState } from 'react';
import useFormErrors from './useFormErrors';
import { invalid } from './validate';
import { ValidateSchema, ValidateSchemaValue } from '@/types/validate';

const useValidateForm = <T extends { [key: string]: any }>(
  form: T,
  validateSchema: ValidateSchema,
) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const copied = { ...validateSchema };
  const { errors, setErrors, isInvalid, firstErroryKey } = useFormErrors();
  const validateAllFormValues = () => {
    const validateSchemaKeys = Object.keys(copied);

    for (let i = 0; i < validateSchemaKeys.length; i++) {
      const key = validateSchemaKeys[i];
      const value = form[key];
      if (!validate(key, value)) {
        return false;
      }
    }

    return true;
  };

  const validate = (key: string, value: any) => {
    const errorMessage = invalid(value, validateSchema[key]);

    if (errorMessage) {
      setErrors((prev) => ({ ...prev!, [key]: errorMessage! }));

      return false;
    }

    setErrors((prev) => {
      const copied = { ...prev };
      delete copied[key];
      return copied;
    });

    return true;
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
