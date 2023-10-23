import { ImageSourcePropType } from 'react-native';

type AutoCapitalizeType = 'none' | 'sentences' | 'words' | 'characters';

type possibleKeyboards = 'default' | 'number-pad' | 'decimal-pad' |
  'numeric' | 'email-address' | 'phone-pad' | 'url'

export interface IBaseInputProps {
  label: string;
  secure?: boolean;
  help?: boolean;
  capitalize?: AutoCapitalizeType;
  mask?: any;
  keyboardType?: possibleKeyboards;
}

export interface ITextInput extends IBaseInputProps {
  images: {
    firstImage?: ImageSourcePropType;
    lastImage?: ImageSourcePropType;
  };
  value: string;
  errors: Record<string, any>;
  onChange: (text: string) => void;
  watch?: string;
}
