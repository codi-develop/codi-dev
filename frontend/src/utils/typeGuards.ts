export const isStringArray = (array: any[]): array is string[] => {
  return array.every((item) => typeof item === 'string');
};

export const isRegExp = (value: any): value is RegExp => {
  return value instanceof RegExp;
};

export const isNumber = (value: any): value is number => {
  return typeof value === 'number';
};

export const isString = (value: any): value is string => {
  return typeof value === 'string';
};
