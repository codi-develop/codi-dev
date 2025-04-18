import { ValidateSchemaValue } from '@/types/validate';

export const invalid = <T>(value: T, validateInfo: ValidateSchemaValue) => {
  const v = validate(value);
  const { required, min, max, minLength, regex } = validateInfo;
  let errorMessage = null;

  if (required) {
    if (!v.isRequired()) {
      return required.message;
    }
  }

  if (min) {
    if (!v.isMin(Number(min.value!))) {
      return min.message;
    }
  }
  if (max) {
    if (typeof max.value === 'number' && !v.isMax(max.value!)) {
      return max.message;
    }
  }
  if (minLength) {
    if (
      typeof minLength.value === 'number' &&
      !v.isMinLength(minLength.value!)
    ) {
      return minLength.message;
    }
  }

  if (regex) {
    if (typeof regex.value !== 'number' && !v.isRegexCorrect(regex.value!)) {
      return regex.message;
    }
  }
  return null;
};

export const validate = <T>(value: T) => {
  return {
    isRequired: () =>
      value !== null &&
      value !== undefined &&
      ((typeof value === 'string' && value !== '') ||
        (Array.isArray(value) && value.length > 0)),
    isRegexCorrect: (regex: RegExp) => new RegExp(regex!).test(value as string),
    isMin: (min: number) => Number(value) > Number(min)!,
    isMax: (max: number) => typeof value === 'number' && value < max!,
    isMinLength: (minLength: number) =>
      typeof value === 'string' && value.length > minLength,
  };
};
