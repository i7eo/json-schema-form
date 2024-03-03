import { defineComponent, ref, watch } from "vue";
import { SelectWidgetPropsDefine } from "../types";

export default defineComponent({
  name: "SelectWidget",
  props: SelectWidgetPropsDefine,
  setup(props) {
    const currentValueRef = ref(props.value);

    watch(currentValueRef, newVal => {
      if (newVal !== props.value) {
        props.onChange(newVal);
      }
    });

    watch(
      () => props.value,
      newVal => {
        if (newVal !== currentValueRef.value) {
          currentValueRef.value = newVal;
        }
      },
    );

    return () => {
      return (
        <select multiple={true} v-model={currentValueRef.value}>
          {props.options.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      );
    };
  },
});
