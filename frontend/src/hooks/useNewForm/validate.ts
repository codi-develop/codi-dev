import {
  ValidateFunction,
  ValidateInfoValue,
  ValidateSchemaValue,
} from '@/types/validate';
import { isNumber, isRegExp, isString } from '@/utils/typeGuards';

export const invalid = <T>(value: T, validateInfo: ValidateSchemaValue) => {
  const v = validate(value);
  const { required, min, max, minLength, regex } = validateInfo;

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

export const validate = <T>(value: T): { [key: string]: ValidateFunction } => {
  return {
    isRequired: () =>
      value !== null &&
      value !== undefined &&
      ((typeof value === 'string' && value !== '') ||
        (Array.isArray(value) && value.length > 0)),
    isRegexCorrect: (regex: ValidateInfoValue) => {
      if (!isString(value)) {
        return false;
      }
      if (isRegExp(regex)) {
        return regex.test(value);
      }
      return false;
    },
    isMin: (min: ValidateInfoValue) => {
      if (isNumber(value) && isNumber(min)) {
        return value > min;
      }

      return false;
    },
    isMax: (max: ValidateInfoValue) => {
      if (isNumber(value) && isNumber(max)) {
        return value < max;
      }
      return false;
    },
    isMinLength: (minLength: ValidateInfoValue) => {
      if (isNumber(minLength) && isString(value)) {
        return value.length > minLength;
      }
      return false;
    },
  };
};
