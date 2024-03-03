import { DefineComponent, PropType } from "vue";

export enum SchemaTypes {
  "NUMBER" = "number",
  "INTEGER" = "integer",
  "STRING" = "string",
  "OBJECT" = "object",
  "ARRAY" = "array",
  "BOOLEAN" = "boolean",
}

type SchemaRef = { $ref: string };

// type Schema = any
export interface Schema {
  type?: SchemaTypes | string;
  const?: any;
  format?: string;

  title?: string;
  default?: any;

  properties?: {
    [key: string]: Schema;
  };
  items?: Schema | Schema[] | SchemaRef;
  uniqueItems?: any;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[];
  enum?: any[];
  enumNames?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: Schema;

  minLength?: number;
  maxLength?: number;
  minimun?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}

export const FieldPropsDefine = {
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
} as const;

export const CommonWidgetPropsDefine = {
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
} as const;

type CommonWidgetDefine = DefineComponent<typeof CommonWidgetPropsDefine>;

export const SelectWidgetPropsDefine = {
  options: {
    type: Array as PropType<
      {
        label: string;
        value: any;
      }[]
    >,
    required: true,
  },
  ...CommonWidgetPropsDefine,
} as const;

type SelectWidgetDefine = DefineComponent<typeof SelectWidgetPropsDefine>;

export enum WidgetNames {
  SelectWidget = "SelectWidget",
  TextWidget = "TextWidget",
  NumberWidget = "NumberWidget",
}

export interface Theme {
  widgets: {
    [WidgetNames.SelectWidget]: SelectWidgetDefine;
    [WidgetNames.TextWidget]: CommonWidgetDefine;
    [WidgetNames.NumberWidget]: CommonWidgetDefine;
  };
}
