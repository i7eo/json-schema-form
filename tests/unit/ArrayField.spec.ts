import { mount } from "@vue/test-utils";
import {
  ArrayField,
  NumberField,
  SelectWidget,
  StringField,
} from "../../packages";
import TestComponent from "./utils/TestComponent";

describe("JsonSchemaForm => ArrayField", () => {
  it("正确渲染数组对象", () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "array",
          items: [
            {
              type: "string",
            },
            {
              type: "number",
            },
          ],
        },
        value: [],
        onChange: () => {},
      },
    });

    const arrayField = wrapper.findComponent(ArrayField);
    const stringField = arrayField.findComponent(StringField);
    const numberField = arrayField.findComponent(NumberField);

    expect(stringField.exists()).toBeTruthy();
    expect(numberField.exists()).toBeTruthy();
  });

  it("正确渲染数组", () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "array",
          items: {
            type: "number",
          },
        },
        value: [1, 2],
        onChange: () => {},
      },
    });

    const arrayField = wrapper.findComponent(ArrayField);
    const numberFields = arrayField.findAllComponents(NumberField);
    expect(numberFields.length).toBe(2);
  });

  it("正确渲染多选数组", () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "array",
          items: {
            type: "number",
            enum: [1, 2, 3],
          },
        },
        value: [1],
        onChange: () => {},
      },
    });

    const arrayField = wrapper.findComponent(ArrayField);
    const select = arrayField.findComponent(SelectWidget);
    expect(select.exists()).toBeTruthy();
  });
});
