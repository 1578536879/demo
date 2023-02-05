import WlButton from "@packages/components/WlButton/src/index.vue";
import { mount, shallowMount, RouterLinkStub } from "@vue/test-utils";
import { httpTest1 } from "./mock";
import { flushPromises } from "@vue/test-utils";

jest.mock("./mock.js");

describe("spanshot-test", () => {
    test("snapshot-test1", () => {
        const wrap = shallowMount(WlButton);
        expect(wrap.element).toMatchSnapshot()
    })
});
