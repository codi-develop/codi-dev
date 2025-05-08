export type ValidateKeys = 'required' | 'regex' | 'min' | 'max' | 'minLength';
export type ValidateInfoValue = RegExp | number | undefined;
export interface ValidateInfo {
  message?: string;
  value?: ValidateInfoValue;
}
export type ValidateFunction = (value?: ValidateInfoValue) => boolean;
export type ValidateSchemaValue = Partial<Record<ValidateKeys, ValidateInfo>>;

export interface ValidateSchema {
  [key: string]: ValidateSchemaValue;
}
