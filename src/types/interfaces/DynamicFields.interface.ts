import { ImageSourcePropType } from "react-native";
import { IBaseInputProps } from "./Input.interface";

export interface IFields extends IBaseInputProps {
    name: string;
    firstImage?: ImageSourcePropType;
    lastImage?: ImageSourcePropType;
    watch?: (field: string) => string;
}

export interface IDynamicFields {
    control: any;
    errors: any;
    fields: IFields[];
}