import { ImageSourcePropType } from "react-native";

export interface IFields {
    name: string;
    label: string;
    firstImage?: ImageSourcePropType;
    lastImage?: ImageSourcePropType;
    secure?: boolean;
    watch?: (field: string) => string;
}

export interface IDynamicFields {
    control: any;
    errors: any;
    fields: IFields[];
}