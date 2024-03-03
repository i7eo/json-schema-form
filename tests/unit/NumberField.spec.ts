import { mount } from "@vue/test-utils";
import JsonSchemaForm, { NumberField } from "../../packages";

describe("JsonSchemaForm => NumberField", () => {
  it("正确渲染数字表单项", async () => {
    let value = "";
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: "number",
        },
        value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });

    const numberField = wrapper.findComponent(NumberField);
    expect(numberField.exists()).toBeTruthy();

    // // 这里只是调用手动触发了包含numberfield的item组件 onchange，一般在使用第三方库的时候只需要调到这一步确定自己代码没问题就ok了
    // await numberField.props("onChange")("123");
    // expect(value).toBe('123');

    // 但是目前来看 numberfield 是我们自己写的，所以我们必须要调到numberfield组件才能达到测试目的
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe(123);
  });

  it("正确渲染对象表单项", async () => {
    
  })
});
