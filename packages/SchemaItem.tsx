import { computed, defineComponent } from "vue";
import ArrayField from "./fields/ArrayField";
import NumberField from "./fields/NumberField";
import ObjectField from "./fields/ObjectField";
import StringField from "./fields/StringField";
import { FieldPropsDefine, SchemaTypes } from "./types";
// const firstUpperCase = (str: string) => {
//   return str
//     .toLowerCase()
//     .replace(/( |^)[a-z]/g, (L: string) => L.toUpperCase());
// };
import { retrieveSchema } from "./utils";

export default defineComponent({
  name: "SchemaItem",
  props: FieldPropsDefine,
  setup(props) {
    // computed 返回的是一个ref
    const retrievedSchemaRef = computed(() => {
      const { rootSchema, schema, value } = props;
      return retrieveSchema(schema, rootSchema, value);
    });

    return () => {
      const { schema } = props;
      // const retrievedSchema = retrieveSchema(schema, rootSchema, value) // 这里的retrieveSchema是要递归整个schema处理所以放到computed中，没必要每次render都处理
      const retrievedSchema = retrievedSchemaRef.value;

      // TODO: 如果type没有指定，我们需要猜测这个type
      const type = schema.type;

      let Component: any;

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField;
          break;
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField;
          break;
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectField;
          break;
        }
        case SchemaTypes.ARRAY: {
          Component = ArrayField;
          break;
        }
        default: {
          console.warn(`${type} is not supported`);
        }
      }

      return <Component {...props} schema={retrievedSchema} />;
    };
  },
});
