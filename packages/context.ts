import { DefineComponent, inject } from "vue";
import { FieldPropsDefine } from "./types";

export const SchemaFromContextKey = Symbol();

// 抽离共用的逻辑 类比 react hooks
type SchemaItemDefine = DefineComponent<typeof FieldPropsDefine>;
export function useSchemaFromContext() {
  // 如果在hook中包含了 reactive 或者 ref 的内容，组件中用到了也会收集到这些数据
  // const context: { SchemaItem: SchemaItemDefine; Theme: Theme } | undefined =
  //   inject(SchemaFromContextKey);
  const context: { SchemaItem: SchemaItemDefine } | undefined =
    inject(SchemaFromContextKey);

  if (!context) throw new Error("SchemaForm should be used");

  return context;
}
