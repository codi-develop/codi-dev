import { ValidateSchemaValue } from "@/types/validate";
import useFormErrors from "./useFormErrors";
 
export const invalid = <T,>(value:T, validateInfo:ValidateSchemaValue)=>{
  const v = validate(value);
  const {required, min, max, minLength} =validateInfo;

  let errorMessage = null;
  
  if(required){
    if(!v.isRequired()){
      errorMessage= required.message;
    }
    
  }  

  if(min){
    if(!v.isMin(Number(min.value!))){
      errorMessage=  min.message;
    }
    
  }  
  if(max){
    if(!v.isMax(max.value!)){
      errorMessage= max.message;
    }
    
  }  
  if(minLength){
    if(!v.isMinLength(minLength.value!)){
      errorMessage= minLength.message;
    }
    
  } 
  return errorMessage; 
}

  export const validate = <T,>(value: T) => {
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


  