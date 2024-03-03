import { defineComponent, reactive, ref, Ref, watchEffect } from "vue";
import SchemaForm, { ThemeProvider } from "../packages";
import Theme from "../packages/theme/default";
import MonacoEditor from "./components/MonacoEditor";
import demos from "./demos";
import "./styles/App.scss";

// TODO: 在lib中export
type Schema = any;
type UISchema = any;

function toJson(data: any) {
  return JSON.stringify(data, null, 2);
}

export default defineComponent({
  setup() {
    const selectedRef: Ref<number> = ref(0);

    // schema/data/uiSchema 对应每个编辑器的数据
    // code 对应json后的数据
    const demo: {
      schema: Schema | null;
      data: any;
      uiSchema: UISchema | null;
      schemaCode: string;
      dataCode: string;
      uiSchemaCode: string;
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: "",
      dataCode: "",
      uiSchemaCode: "",
    });

    watchEffect(() => {
      const idx = selectedRef.value;
      // 因为不确定选中的对象中有没有schema/default/uischema属性，所以这样写
      const d: {
        [k: string]: any;
      } = demos[idx];
      demo.schema = d.schema;
      demo.data = d.default;
      demo.uiSchema = d.uiSchema;
      demo.schemaCode = toJson(d.schema);
      demo.dataCode = toJson(d.default);
      demo.uiSchemaCode = toJson(d.uiSchema);
    });

    const methodRef: Ref<any> = ref();

    const handleChange = (v: any) => {
      demo.data = v;
      demo.dataCode = toJson(v);
    };

    function handleCodeChange(
      field: "schema" | "data" | "uiSchema",
      value: string,
    ) {
      try {
        const json = JSON.parse(value);
        demo[field] = json;
        (demo as any)[`${field}Code`] = value;
      } catch (err) {
        // 因为不能保证每一次输入都能jsonstringfy成功所以需要trycatch
      }
    }

    const handleSchemaChange = (v: string) => handleCodeChange("schema", v);
    const handleDataChange = (v: string) => handleCodeChange("data", v);
    const handleUISchemaChange = (v: string) => handleCodeChange("uiSchema", v);

    return () => {
      const selected = selectedRef.value;
      console.log(methodRef);
      console.log(demos);

      return (
        <main>
          <section class="menu">
            <h1>Vue3 JsonSchema Form</h1>
            <div>
              {demos.map((demo, idx) => (
                <button
                  class={{
                    menu__button: true,
                    "menu--selected": idx === selected,
                  }}
                  onClick={() => {
                    selectedRef.value = idx;
                  }}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </section>
          <section class="content">
            <div class="code">
              <MonacoEditor
                title="Schema"
                code={demo.schemaCode}
                onChange={handleSchemaChange}
              />
              <div class="ui-and-value">
                <MonacoEditor
                  title="UISchema"
                  code={demo.uiSchemaCode}
                  onChange={handleUISchemaChange}
                />
                <MonacoEditor
                  title="Value"
                  code={demo.dataCode}
                  onChange={handleDataChange}
                />
              </div>
            </div>
            <div class="form">
              <ThemeProvider theme={Theme as any}>
                <SchemaForm
                  // theme={Theme as any}
                  schema={demo.schema}
                  value={demo.data}
                  onChange={handleChange}
                />
              </ThemeProvider>
            </div>
          </section>
        </main>
      );
    };
  },
});
