import { ImageSourcePropType } from "react-native";

export interface IErros {
    title: string;
    label: string;
}

export interface IDynamicErrors {
    fields: IErros[];
    errors: any;
}