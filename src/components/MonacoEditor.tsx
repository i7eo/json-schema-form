import * as Monaco from "monaco-editor";
import type { PropType } from "vue";
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from "vue";

export default defineComponent({
  name: "MonacoEditor",
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    // must be shallowRef, if not editor.getValue() won't work
    const editorRef = shallowRef();
    const containerRef = ref();

    let _subscription: Monaco.IDisposable | undefined;
    let __prevent_trigger_change_event = false;

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: "json",
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        },
      ));

      _subscription = editor.onDidChangeModelContent(event => {
        console.log("--------->", __prevent_trigger_change_event);
        if (!__prevent_trigger_change_event) {
          props.onChange(editor.getValue(), event);
        }
      });
    });

    onBeforeUnmount(() => {
      if (_subscription) _subscription.dispose();
    });

    watch(
      () => props.code,
      v => {
        const editor = editorRef.value;
        const model = editor.getModel();
        if (v !== model.getValue()) {
          editor.pushUndoStop();
          __prevent_trigger_change_event = true;
          // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ],
          );
          editor.pushUndoStop();
          __prevent_trigger_change_event = false;
        }
        // if (v !== editorRef.value.getValue()) {
        //   editorRef.value.setValue(v)
        // }
      },
    );

    return () => {
      return (
        <div class="monaco__container">
          <div class="monaco__title">
            <span>{props.title}</span>
          </div>
          <div class="monaco__code" ref={containerRef}></div>
        </div>
      );
    };
  },
});
