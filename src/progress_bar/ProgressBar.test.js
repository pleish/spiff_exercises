import React from "react";
import { ExerciseBtn } from "../exercise/Exercise";
import { ProgressBar, Solution } from "./ProgressBar";
import { shallow } from "enzyme";

describe("Toggle RequestBtn", () => {
  it("check class", () => {
    const wrapper = shallow(<ExerciseBtn color="green" />);
    expect(wrapper.state("class")).toBe("request-btn normal");

    wrapper.simulate("mouseenter");
    expect(wrapper.state("class")).toBe("request-btn hovered");

    wrapper.simulate("mouseleave");
    expect(wrapper.state("class")).toBe("request-btn normal");

    wrapper.simulate("mousedown");
    expect(wrapper.state("class")).toBe("request-btn clicked");

    wrapper.simulate("mouseup");
    expect(wrapper.state("class")).toBe("request-btn hovered");
  });
});

describe("ProgressBar changes", () => {
  it("updatePercentHidden", () => {
    const wrapper = shallow(<ProgressBar percentage={0} barOpacity={1.0} />);
    expect(wrapper.state("percentHidden")).toBe(100);

    wrapper.setProps({ percentage: 10 });
    expect(wrapper.state("percentHidden")).toBe(90);
  });
});

describe("Solution timer", () => {
  it("should timeout after 15 seconds", (done) => {
    const wrapper = shallow(<Solution />);
    expect(wrapper.state("percentage")).toBe(0);
    expect(wrapper.state("blockLoad")).toBe(false);
    expect(wrapper.state("barOpacity")).toBe(1.0);

    wrapper.find(ExerciseBtn).first().simulate("click");
    setTimeout(() => {
      expect(wrapper.state("percentage")).toBeLessThan(91);
      expect(wrapper.state("percentage")).toBeGreaterThanOrEqual(90);
      done();
    }, 16000);
  }, 20000);
});
