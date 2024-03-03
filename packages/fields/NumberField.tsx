import { defineComponent } from "vue";
import { FieldPropsDefine } from "../types";

export default defineComponent({
  name: "NumberField",
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = Number(e.target.value);

      if (Number.isNaN(value)) {
        props.onChange(undefined);
      } else {
        props.onChange(value);
      }
    };

    return () => {
      const { value } = props;
      return (
        <input type="number" value={value as number} onInput={handleChange} />
      );
    };
  },
});
