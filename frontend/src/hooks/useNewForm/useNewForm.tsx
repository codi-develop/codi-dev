import { ChangeEvent, useEffect, useState } from 'react';
import useValidateForm from './useValidateForm';
import { ValidateSchema } from '@/types/validate';
import { useDebounce } from 'react-simplikit';
import useFormElementRefs from './useFormElementRefs';

type ExternalValues<T> = T & { [key: string]: any };

const useNewForm = <T extends object>(
  initialValues: T,
  validationSchema?: ValidateSchema,
  externalValues?: ExternalValues<T>,
) => {
  const [form, setForm] = useState(initialValues);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { errors, validateAll, validate, isInvalid, firstErroryKey } =
    useValidateForm(form, validationSchema!);
  const debouncedValidation = useDebounce(<T,>(name: string, value: T) => {
    validate(name!, value);
  }, 500);
  const { handleFormElementRef } = useFormElementRefs(errors, firstErroryKey);

  /** Form 초기화 */
  const loadFormValuesFromExternal = (externalValues: ExternalValues<T>): T => {
    let newForm = { ...form };
    Object.keys(externalValues).forEach((key) => {
      if (key in newForm) {
        newForm = {
          ...newForm,
          [key]: externalValues[key as keyof typeof externalValues],
        };
      }
    });
    return newForm;
  };

  useEffect(() => {
    if (externalValues) {
      setForm(loadFormValuesFromExternal(externalValues));
    }
  }, []);

  /** form value handler */
  const handleFormValueChange = <T,>(
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: T },
  ) => {
    const target = 'target' in e ? e.target : e;
    const { name, value } = target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (isFormSubmitted) {
      debouncedValidation(name!, value);
    }
  };

  return {
    form,
    setForm,
    handleFormValueChange,
    errors,
    validate,
    validateAll,
    isInvalid,
    setIsFormSubmitted,
    firstErroryKey,
    isFormSubmitted,
    handleFormElementRef,
  };
};

export default useNewForm;
