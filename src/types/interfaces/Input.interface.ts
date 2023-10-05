
import { ImageSourcePropType } from 'react-native';

export interface ITextInput {
  label: string;
  images?: {
    firstImage: ImageSourcePropType;
    lastImage: ImageSourcePropType;
  };
  secure?: boolean;
  value: string;
  errors: Record<string, any>;
  onChange: (text: string) => void;
  watch?: string;
}