export type ValidateKeys = "required" | "regex" |"min" |"max"|"minLength";
export interface ValidateInfo  {
    message? : string;
    value? : number | RegExp;
}  
export type ValidateSchemaValue  = Partial<Record<ValidateKeys, ValidateInfo>>

export interface ValidateSchema {
  [key:string]: ValidateSchemaValue
  }