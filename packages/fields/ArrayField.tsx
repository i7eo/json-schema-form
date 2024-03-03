import { defineComponent, PropType } from "vue";
import { useSchemaFromContext } from "../context";
// import SelectWidget from "../widgets/SelectWidget";
import { getWidget } from "../theme";
import { FieldPropsDefine, Schema, WidgetNames } from "../types";

const ArrayItemWrapper = defineComponent({
  name: "ArrayItemWrapper",
  props: {
    onAdd: {
      type: Function as PropType<(idx: number) => void>,
      required: true,
    },
    onRemove: {
      type: Function as PropType<(idx: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(idx: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(idx: number) => void>,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const handleAdd = () => props.onAdd(props.idx);
    const handleRemove = () => props.onRemove(props.idx);
    const handleUp = () => props.onUp(props.idx);
    const handleDown = () => props.onDown(props.idx);

    return () => {
      return (
        <div class="array__wrapper">
          <div class="array__actions">
            <button onClick={handleAdd}>add</button>
            <button onClick={handleRemove}>remove</button>
            <button onClick={handleUp}>up</button>
            <button onClick={handleDown}>down</button>
          </div>
          <div>{slots.default && slots.default()}</div>
        </div>
      );
    };
  },
});

/**
 * 1. 简单数组：number[] Array<string> ... 注意点没有长度限制
 * 2. 数组对象：object[]
 * 3. 自定义数据的数组: { item: string, enum: [1, 0] } 需要特殊处理，一般用在单选1或者多选
 */

export default defineComponent({
  name: "ArrayField",
  props: FieldPropsDefine,
  setup(props) {
    const context = useSchemaFromContext();
    // const SelectWidget = context.Theme.widgets.Select;
    const SelectWidgetRef = getWidget(WidgetNames["SelectWidget"]);

    const handleArrayFieldChange = (v: any, idx: number) => {
      const { value } = props;
      const currentValue = Array.isArray(value) ? value : [];
      currentValue[idx] = v;
      props.onChange(currentValue);
    };

    const handleAdd = (idx: number) => {
      const { value } = props;
      const currentValue = Array.isArray(value) ? value : [];
      currentValue.splice(idx + 1, 0, undefined);
      props.onChange(currentValue);
    };

    const handleRemove = (idx: number) => {
      const { value } = props;
      const currentValue = Array.isArray(value) ? value : [];
      currentValue.splice(idx, 1);
      props.onChange(currentValue);
    };

    const handleUp = (idx: number) => {
      if (idx === 0) return false;
      const { value } = props;
      const currentValue = Array.isArray(value) ? value : [];
      const item = currentValue.splice(idx, 1);
      currentValue.splice(idx - 1, 0, ...item);
      props.onChange(currentValue);
    };

    const handleDown = (idx: number) => {
      const { value } = props;
      const currentValue = Array.isArray(value) ? value : [];
      if (idx === currentValue.length - 1) return false;

      const item = currentValue.splice(idx, 1);
      currentValue.splice(idx + 1, 0, ...item);
      props.onChange(currentValue);
    };

    return () => {
      const { rootSchema, schema, value } = props;
      const { SchemaItem } = context;
      const SelectWidget = SelectWidgetRef.value;

      // 2
      const isMultiType = Array.isArray(schema.items);
      // 1
      const isSelect = schema.items && (schema.items as any).enum;

      if (isMultiType) {
        const items: Schema[] = schema.items as any;
        const currentValue = Array.isArray(value) ? value : [];
        return items.map((schema: Schema, idx: number) => (
          <SchemaItem
            key={idx}
            rootSchema={rootSchema}
            schema={schema}
            value={currentValue[idx]}
            onChange={(v: any) => handleArrayFieldChange(v, idx)}
          />
        ));
      } else if (!isSelect) {
        const currentValue = Array.isArray(value) ? value : [];
        return currentValue.map((v: any, idx: number) => (
          <ArrayItemWrapper
            idx={idx}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onUp={handleUp}
            onDown={handleDown}
          >
            <SchemaItem
              key={idx}
              rootSchema={rootSchema}
              schema={schema.items as Schema}
              value={v}
              onChange={(v: any) => handleArrayFieldChange(v, idx)}
            />
          </ArrayItemWrapper>
        ));
      } else {
        const options = (schema as any).items.enum.map((e: any) => ({
          label: e,
          value: e,
        }));
        return (
          <SelectWidget
            options={options}
            value={props.value}
            onChange={props.onChange}
          />
        );
      }
      return null;
    };
  },
});
