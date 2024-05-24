import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

// Define a type for the slice state
export interface AccessibilityState {
  zoom: number;
  highlight: boolean;
  letterSpacing: string;
  lineHeight: number;
  focused: boolean;
  font: {
    color: string | null;
    size : number;
  },
  accessibilityOption: AccessibilityOption
}
interface AccessibilityOption {
  retinal:ActivatedOption;
  visual : ActivatedOption;
  achromatopsia:ActivatedOption;
  impreciseMovement:ActivatedOption;
}

interface ActivatedOption {
    severity :string | null; 
    isActivated:boolean;
}

interface UpdateDisabilityState {
  key: keyof AccessibilityOption;
  isActivated: boolean;
}


// Define the initial state using that type
const initialState: AccessibilityState = {
  zoom: 1,
  highlight: false,
  letterSpacing: 'initial',
  lineHeight: 1,
  focused: false,
  font: {
    color : null,
    size : 0
  },
  accessibilityOption:{
    retinal:{
      severity:null,
      isActivated:false
    },
    visual:{
      severity:null,
      isActivated:false
    },
    achromatopsia:{
      severity:null,
      isActivated:false
    },
    impreciseMovement:{
      severity:null,
      isActivated:false
    },
    
  }
 
};



export const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    initializeAll: (state) => {
      state.focused = false;
      state.highlight = false;
      state.letterSpacing = 'initial';
      state.lineHeight = 1;
      state.zoom = 1;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
    setHighlight: (state) => {
      state.highlight = !state.highlight;
    },
    setLetterSpacing: (state, action) => {
      state.letterSpacing = action.payload;
    },
    setLineHeight: (state, action) => {
      state.lineHeight = action.payload;
    },
    setFocused: (state) => {
      state.focused = !state.focused;
    },
    toggleFontSize:(state, action)=> {
      if(action.payload === 'increase'){
        state.font.size = state.font!.size + 2;
        return;
      }
      state.font.size = state.font!.size - 2;
    },
    setActivatedAccessibilityOption:(state,action: PayloadAction<UpdateDisabilityState>)=> {
      const { key, isActivated } = action.payload

      if (state.accessibilityOption.hasOwnProperty(key)) {
        state.accessibilityOption[key].isActivated = isActivated!;
      }
      
    },
  },
});

export const {
  setZoom,
  setHighlight,
  setLetterSpacing,
  setLineHeight,
  setFocused,
  toggleFontSize,
  initializeAll,
  setActivatedAccessibilityOption
} = accessibilitySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectZoom = (state: RootState) => state.accessibility.zoom;
export const selectHighlight = (state: RootState) =>
  state.accessibility.highlight;
export const selectLetterSpacing = (state: RootState) =>
  state.accessibility.letterSpacing;
export const selectLineHeight = (state: RootState) =>
  state.accessibility.lineHeight;
export const selectFocused = (state: RootState) =>
  state.accessibility.focused;
export const selectFont = (state: RootState) =>
  state.accessibility.font;
export const selectAccessibilityOption = (state: RootState) =>
  state.accessibility.accessibilityOption;

export default accessibilitySlice.reducer;