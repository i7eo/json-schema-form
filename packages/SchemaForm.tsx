import { defineComponent, PropType, provide } from "vue";
import { SchemaFromContextKey } from "./context";
import SchemaItem from "./SchemaItem";
import { Schema } from "./types";

export default defineComponent({
  name: "SchemaForm",
  props: {
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
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true,
    // },
  },
  setup(props) {
    // { slots, emit, attrs }
    // 一般做组件的时候不直接使用传入的函数（onchange）一般都会再包装一层，方便控制
    const handleChange = (v: any) => {
      props.onChange(v);
    };

    // provide(SchemaFromContextKey, { SchemaItem, Theme: props.theme });
    provide(SchemaFromContextKey, { SchemaItem });

    return () => {
      const { schema, value } = props;
      return (
        <SchemaItem
          rootSchema={schema}
          schema={schema}
          value={value}
          onChange={handleChange}
        />
      );
    };
  },
});
