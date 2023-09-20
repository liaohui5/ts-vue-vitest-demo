import XButton from "./index.vue";
import { mount } from "@vue/test-utils";

describe("XButton", () => {
  it("render", () => {
    const wrapper = mount(XButton);
    expect(wrapper.classes()).toContain("xbtn");
    expect(wrapper.classes()).toContain("default");
    expect(wrapper.text()).toContain("button");
  });

  it("should be set text when set props text field", () => {
    const text = "clickMe";
    const wrapper = mount(XButton, { props: { text } });
    expect(wrapper.text()).toContain(text);
  });

  it("should be add color className when set props color field", () => {
    const wrapper = mount(XButton, {
      props: {
        color: "info",
      },
    });

    expect(wrapper.classes()).toContain("info");
  });

  it("should be trigger click event", () => {
    const onClick = vi.fn();
    const wrapper = mount(XButton, {
      props: {
        onClick,
      },
    });

    wrapper.find("button").trigger("click");
    expect(onClick).toBeCalled();
  });

  it("should be not trigger click event when disabled is true", () => {
    const onClick = vi.fn();
    const wrapper = mount(XButton, {
      props: {
        onClick,
        disabled: true,
      },
    });

    wrapper.find("button").trigger("click");
    expect(onClick).not.toBeCalled();
  });
});
