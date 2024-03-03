import { defineComponent, PropType } from "vue";
import JsonSchemaForm, { ThemeProvider } from "../../../packages";
import Theme from "../../../packages/theme/default";
import { Schema } from "../../../packages/types";

export default defineComponent({
  name: "TestComponent",
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
  },
  setup(props) {
    return () => (
      <ThemeProvider theme={Theme as any}>
        <JsonSchemaForm {...props} />
      </ThemeProvider>
    );
  },
});
