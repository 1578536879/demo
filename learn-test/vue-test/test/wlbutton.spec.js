import Button from "@packages/components/Button/src/index.vue";
import { mount, shallowMount, RouterLinkStub } from "@vue/test-utils";
import { httpTest1 } from "./mock";
import { flushPromises } from "@vue/test-utils";

jest.mock("./mock.js");

describe("test-Button.vue", () => {
  // test("test1", () => {
  //   // 渲染组件
  //   const wrapper = shallowMount(Button, {
  //     // 传递给组件的props参数
  //     propsData: {
  //       text: "测试1",
  //       a: "1",
  //     },
  //   });
  //   const attrs = wrapper.attributes();
  //   const spanList = wrapper.findAll("span");
  //   console.log("spanList", spanList.length);
  //   console.log("attrs", attrs, wrapper.classes());
  //   console.log("props", wrapper.props());
  //   console.log("style", wrapper.element.style.width);

  //   jest.useFakeTimers();
  //   jest.spyOn(window, "clearTimeout");
  //   setTimeout.mockReturnValue(111);
  //   const timer = setTimeout(() => {
  //     console.log("setTimeout");
  //   }, 100);
  //   console.log(timer); ///111
  //   console.log("setTimeout-after");
  //   jest.runTimersToTime(100);
  //   console.log("setTimeout-after2");
  //   clearTimeout(timer); //fail
  //   expect(window.clearTimeout).toHaveBeenCalledWith(111); //success
  //   // 进行断言，判断页面上是否包含测试1的文字
  //   expect(wrapper.text()).toContain("测试1");
  // });

  // test("http", async () => {
  //   const $aaa = {
  //     start: () => {
  //       console.log("start");
  //     },
  //     end: jest.fn(),
  //   };
  //   const wrapper = shallowMount(Button, {
  //     mocks: { $aaa },
  //   });
  //   // expect.assertions(1)
  //   const data = [{ id: 2 }, { id: 3 }];
  //   httpTest1.mockResolvedValueOnce(data);
  //   // expect($data.end).toHaveBeenCalled()
  //   Promise.resolve().then(() => {
  //     console.log(1);
  //   });
  //   console.log(2);
  //   await flushPromises();
  //   console.log(3);
  //   // expect($data.end).toHaveBeenCalled()
  // });

  // test("event", () => {
  //   const onClick = jest.fn();
  //   const wrapper = shallowMount(Button, {
  //     propsData: {
  //       onClick,
  //     },
  //   });
  //   wrapper.find(".btn").trigger("click");
  //   expect(onClick).toHaveBeenCalled();
  //   expect(wrapper.emitted("onClick")).toHaveLength(1);
  // });

  const MixinExp = {
    created() {
      console.log("created--mixins")
    }
  }
  
  // => 1
  // => 2
  
  // test("subs", () => {
  //   console.log(RouterLinkStub)
  //   const bnt = shallowMount(Button, {
  //     stubs: {
  //       RouterLink: RouterLinkStub
  //     }
  //   })
  // })
    
    
    test("mixin", () => {
      const comp = mount(Button, {
        mixins: [MixinExp ]
      })
    })
});
