import { useEffect } from 'react';
import useFormErrors from './useFormErrors';
import { invalid } from './validate';
import { ValidateSchema, ValidateSchemaValue } from '@/types/validate';

const useValidateForm = <T extends { [key: string]: any }>(
  form: T,
  validateSchema: ValidateSchema,
) => {
  const copied = { ...validateSchema };
  const { errors, setErrors } = useFormErrors(form);
  const validateAll = () => {
    Object.keys(copied).forEach((k: string) => {
      validate(k, form[k]);
    });
  };

  const validate = (k: string, value: any) => {
    const schema = validateSchema[k];
    const errorMessage = invalid(value, schema as ValidateSchemaValue);

    if (errorMessage) {
      setErrors((prev) => ({ ...prev!, [k as string]: errorMessage! }));

      return;
    }

    setErrors((prev) => {
      const copied = { ...prev };
      delete copied[k];
      return copied;
    });
  };

  return { validate, validateAll, errors };
};

export default useValidateForm;
