import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  PropType,
  provide,
} from "vue";
import { Theme, WidgetNames } from "./types";

const THEME_PROVIDER_KEY = Symbol();

const ThemeProvider = defineComponent({
  name: "ThemeProvider",
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme);

    provide(THEME_PROVIDER_KEY, context);

    return () => slots.default && slots.default();
  },
});

export function getWidget<T extends WidgetNames>(name: T) {
  // 这里的context 通过computed得到的是 ref 所以类型必须是 Ref/ComputedRef ComputedRef 继承自 Ref
  const context: ComputedRef<Theme> | undefined = inject(THEME_PROVIDER_KEY);
  if (!context) {
    throw new Error("Theme required");
  }

  const widgetRef = computed(() => {
    return context.value.widgets[name];
  });

  return widgetRef;
}

export default ThemeProvider;
