import { useRef } from 'react';
import { FormErrors } from './useFormErrors';

const useFormElementRefs = (
  errors: FormErrors | null,
  firstErroryKey: string,
) => {
  const formElementRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const shouldNotScrollConditions = (key: string) => {
    return {
      isErrorsNull: errors === null || !errors[key],
      isNotSettedRef: !formElementRefs.current[key],
      isCurrentKeyNotFirstErrorKey: key !== firstErroryKey,
    };
  };

  const setRef = (el: HTMLDivElement, key: string) => {
    formElementRefs.current![key] = el!;
  };

  const scrollToFormElement = (key: string) => {
    formElementRefs.current[key].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  };

  const handleFormElementRef = (el: HTMLDivElement, key: string) => {
    setRef(el, key);

    if (
      Object.values(shouldNotScrollConditions(key)).some(
        (condition) => condition,
      )
    ) {
      return;
    }

    scrollToFormElement(key);
  };

  return { handleFormElementRef };
};
export default useFormElementRefs;
