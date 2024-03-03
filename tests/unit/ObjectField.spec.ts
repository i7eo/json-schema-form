import { mount } from "@vue/test-utils";
import JsonSchemaForm, { NumberField, StringField } from "../../packages";

describe("JsonSchemaForm => ObjectField", () => {
  let schema: any = null;
  beforeEach(() => {
    schema = {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        age: {
          type: "number",
        },
      },
    };
  });

  it("正确渲染对象表单项的子节点(properties)", async () => {
    let value = {};
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value,
        onChange: () => {},
      },
    });

    const stringField = wrapper.findComponent(StringField);
    const numberField = wrapper.findComponent(NumberField);

    expect(stringField.exists()).toBeTruthy();
    expect(numberField.exists()).toBeTruthy();
  });

  it("当对象表单项的子节点(properties)发生 onchange 时，是否正确渲染", async () => {
    let value: any = {};
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });

    const stringField = wrapper.findComponent(StringField);
    const numberField = wrapper.findComponent(NumberField);

    await stringField.props("onChange")("i7eo");
    expect(value.name).toEqual("i7eo");

    await numberField.props("onChange")("1");
    expect(value.age).toEqual("1");
  });

  it("当对象表单项的子节点(properties)发生传入 undefined 时，是否正确渲染", async () => {
    let value: any = {
      name: "i7eo",
    };
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });

    const stringField = wrapper.findComponent(StringField);

    await stringField.props("onChange")(undefined);
    expect(value.name).toBeUndefined();
  });
});
