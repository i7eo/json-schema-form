import { defineComponent } from "vue";
// import SchemaItem from "../SchemaItem";
// console.log(SchemaItem);
// ObjectField.tsx 中引用 SchemaItem.tsx, SchemaItem.tsx 中又引用 ObjectField.tsx 这种相互引用webpack可以帮助处理，但是后期嵌套较多的时候会出现意料不到的bug，
// 为什么相互引用？ 因为 SchemaItem 是所有表单项的入口，统一做表单类型判断的地方，而 ObjectField 中可能包含 string、number。。。所以需要引入
// 可以安装 circular-dependency-plugin 来检查代码中的循环引用并在命令行提示
// 解决办法在 form 层 provide 出来要用的组件实例，在该文件下直接 inject 接收使用就醒了，类比vue2中写的form组件
import { useSchemaFromContext } from "../context";
import { FieldPropsDefine } from "../types";
import { isObject } from "../utils";

// 将 line： 13/19/20/21 提取成hook: useSchemaFromContext
// type SchemaItemDefine = DefineComponent<typeof FieldPropsDefine>; // 因为这里用到了 SchemaItem 组件实例，所以需要对其定义，利用vue3提供的 组件定义DefineComponent 再传入 props的定义即可

export default defineComponent({
  name: "ObjectField",
  props: FieldPropsDefine,
  setup(props) {
    // const context: { SchemaItem: SchemaItemDefine } | undefined =
    //   inject(SchemaFromContextKey);
    // if (!context) throw new Error("SchemaForm should be used");

    const context = useSchemaFromContext();

    const handleChange = (k: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {};

      if (v === undefined) {
        delete value[k];
      } else {
        value[k] = v;
      }

      props.onChange(value);
    };

    return () => {
      const { SchemaItem } = context;
      const { rootSchema, schema, value } = props;

      const properties = schema.properties || {};

      const currentValue: any = isObject(value) ? value : {};

      return Object.keys(properties).map((k: string, idx: number) => (
        <SchemaItem
          key={idx}
          rootSchema={rootSchema}
          schema={properties[k]}
          value={currentValue[k]}
          onChange={(v: any) => handleChange(k, v)}
        />
      ));
    };
  },
});
