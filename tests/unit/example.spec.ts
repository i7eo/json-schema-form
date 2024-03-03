import { shallowMount } from "@vue/test-utils";
import { defineComponent, h } from "vue";

const HelloWorld = defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    return () => h("div", props.msg);
  },
});

beforeAll(() => {
  console.log("beforeAll");
});

afterAll(() => {
  console.log("afterAll");
});

beforeEach(() => {
  console.log("beforeEach");
});

afterEach(() => {
  console.log("afterEach");
});

describe("HelloWorld.vue", () => {
  //describe 有单独的作用域
  beforeAll(() => {
    // 预设
    console.log("beforeAll --");
  });

  afterAll(() => {
    // 清理
    console.log("afterAll --");
  });

  beforeEach(() => {
    // 预设
    console.log("beforeEach --");
  });

  afterEach(() => {
    // 清理
    console.log("afterEach --");
  });
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
  it("简单测试", () => {
    expect(1 + 1).toBe(2);
  });
  /**
   * 异步测试, jest是同步测试，忽略settimeout中的内容
   * 方法1: it中带出done，并在异步调用结束后执行done
   * 方法2：使用promise
   * 方法3: async/awiat
   */
  // it("异步测试方法1", done => {
  //   setTimeout(() => {
  //     expect(1 + 3).toBe(4);
  //     done();
  //   }, 100);
  // });
  // it("异步测试方法2", () => {
  //   return new Promise((resolve, reject) => {
  //     expect(1 + 3).toBe(4);
  //     resolve();
  //   });
  // });
  it("异步测试方法3", async () => {
    const wrapper = shallowMount(HelloWorld);
    await wrapper.setProps({
      msg: "123",
    });
    expect(wrapper.text()).toEqual('123');
  });
});
