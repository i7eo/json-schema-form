import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  name: "SelectWidget",
  props: {
    value: {
      required: true,
    },
    options: {
      type: Array as PropType<
        {
          label: string;
          value: any;
        }[]
      >,
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
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
