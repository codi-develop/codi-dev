import { ChangeEvent, useEffect, useState } from 'react';
import useValidateForm from './useValidateForm';
import { ValidateSchema } from '@/types/validate';
import { useDebounce } from 'react-simplikit';
import useFormElementRefs from './useFormElementRefs';

const useNewForm = <T extends { [key: string]: any }>(
  initialValues: T,
  validationSchema?: ValidateSchema,
  serverData?: object,
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
  const setFormFromServerData = (data: object) => {
    const formValues = { ...form };
    Object.keys(data).forEach((key) => {
      if (Object.hasOwn(form, key)) {
        Object.assign(formValues, {
          ...formValues,
          [key]: data[key as keyof typeof data],
        });
      }
    });
    return formValues;
  };
  useEffect(() => {
    if (serverData) {
      setForm(setFormFromServerData(serverData!));
    }
  }, [serverData]);

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
