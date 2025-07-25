declare module "*.scss" {
    interface IClassNames {
        [className:string]:string
    }
    const classNames: IClassNames;
    export = classNames
}

declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
  }

declare const __API__ : string;
declare const __IS_DEV__:boolean;

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;