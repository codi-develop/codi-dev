import { useEffect } from 'react';
import useFormErrors from './useFormErrors';
import { invalid } from './validate';
import { ValidateSchema, ValidateSchemaValue } from '@/types/validate';

const useValidateForm = <T extends { [key: string]: any }>(
  form: T,
  validateSchema: ValidateSchema,
) => {
  const copied = { ...validateSchema };
  const { errors, setErrors, isInvalid } = useFormErrors(form);
  const validateAll = () => {
    const results: boolean[] = [];
    Object.keys(copied).forEach((k: string) => {
      const result = validate(k, form[k]);
      results.push(result);
    });

    if (results.some((r) => !r)) {
      return false;
    }

    return true;
  };

  const validate = (k: string, value: any) => {
    const schema = validateSchema[k];
    const errorMessage = invalid(value, schema as ValidateSchemaValue);

    if (errorMessage) {
      setErrors((prev) => ({ ...prev!, [k as string]: errorMessage! }));

      return false;
    }

    setErrors((prev) => {
      const copied = { ...prev };
      delete copied[k];
      return copied;
    });

    return true;
  };

  return { validate, validateAll, errors, isInvalid };
};

export default useValidateForm;
