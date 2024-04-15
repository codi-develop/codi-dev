import { ChangeEvent, useEffect, useState } from 'react';
import useValidateForm from './useValidateForm';
import { ValidateSchema } from '@/types/validate';

const useNewForm = <T extends { [key: string]: any }>(
  initialValues: T,
  validationSchema?: ValidateSchema,
  serverData?: object,
) => {
  const [form, setForm] = useState(initialValues);
  const { errors, validateAll, validate } = useValidateForm(
    form,
    validationSchema!,
  );
  /** Form 초기화 */
  if (serverData)
    useEffect(() => {
      setForm((prev) => ({ ...prev, serverData }));
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
    validate(name!, value);
  };

  return { form, setForm, handleFormValueChange, errors, validateAll };
};

export default useNewForm;
