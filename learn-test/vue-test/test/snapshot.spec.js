import Button from "@packages/components/Button/src/index.vue";
import { mount, shallowMount, RouterLinkStub } from "@vue/test-utils";
import { httpTest1 } from "./mock";
import { flushPromises } from "@vue/test-utils";

jest.mock("./mock.js");

describe("spanshot-test", () => {
    test("snapshot-test1", () => {
        const wrap = shallowMount(Button);
        expect(wrap.element).toMatchSnapshot()
    })
});
