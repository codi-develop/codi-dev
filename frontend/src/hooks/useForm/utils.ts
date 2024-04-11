import { FormType } from './useForm';

export const getFormattedFormValues = (initialFormValues: FormType) => {
  const form = { ...initialFormValues };
  Object.keys(initialFormValues).forEach((key) => {
    const formValue = form[key];

    Object.assign(form, {
      ...form,
      [key]: {
        ...formValue,
        value: formValue.initialValue ?? null,
        isValid: 'initial',
      },
    });
  });

  return form;
};

