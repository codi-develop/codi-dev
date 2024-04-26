import { ChangeEvent, useEffect, useState } from 'react';
import useValidateForm from './useValidateForm';
import { ValidateSchema } from '@/types/validate';

const useNewForm = <T extends { [key: string]: any }>(
  initialValues: T,
  validationSchema?: ValidateSchema,
  serverData?: object,
) => {
  const [form, setForm] = useState(initialValues);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { errors, validateAll, validate, isInvalid } = useValidateForm(
    form,
    validationSchema!,
  );
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
      validate(name!, value);
    }
  };

  return {
    form,
    setForm,
    handleFormValueChange,
    errors,
    validateAll,
    isInvalid,
    setIsFormSubmitted,
    isFormSubmitted,
  };
};

export default useNewForm;
