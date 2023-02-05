import getter from "../src/store/getter";
import mutations from "../src/store/mutations";
import action from "../src/store/action";
import Store from "../src/store";
import Vuex from "vuex";
import { flushPromises, shallowMount, createLocalVue  } from "@vue/test-utils";
import { httpTest1 } from "./mock";
jest.mock("./mock.js");


describe("vuex", () => {
  let localStore, store;
  test("getter", () => {
    const name = "啦啦啦啦";
    const origin_name = {
      name,
    };
    const data = getter.getter_name(origin_name);
    expect(data).toBe(name);
  });

  test("store", () => {
    beforeEach(() => {
        console.log("beforeEach")
      localStore = {
        getters: {
          getter_age: jest.fn(),
        },
        mutations: {
          mutation_age: jest.fn(),
        },
      };
      store = new Vuex.Store(localStore);
    });
  });
  test("mutation", () => {
    console.log("111---localStore", localStore)
    const new_name = "啦啦啦啦";
    const origin_name = {
      name: "哇哇哇",
    };
    mutations.mutation_name(origin_name, new_name);
    expect(origin_name.name).toBe(new_name);
  });

  //   test("action", async () => {
  //     expect.assertions(1)
  //     const name = "哈哈哈"
  //     // 创建一个假的上下文
  //      const ctx = {
  //         commit: jest.fn()
  //      }
  //      httpTest1.mockImplemntationNoce(calledWith => {
  //         return Promise.resolve()
  //      })
  //     //  调用actions
  //      action.action_state_name(ctx, name)
  //      await flushPromises()
  //     //  判断是否调用对应的mutation
  //      expect(ctx.commit).toHaveBeenCalledWith("mutation_name")
  //   })


//   test("vue", () => {
//     console.log("localStore", localStore);
//     shallowMount(componentName, {
//         $store: localStore
//     })
//   });
});
