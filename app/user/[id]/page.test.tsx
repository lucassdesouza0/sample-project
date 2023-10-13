import React from "react";
import { render } from "@testing-library/react";
import Page from "./page";
import { expect } from "@jest/globals";
import { Providers } from "@/lib/providers";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const ReduxWrapper = ({ children }: { children?: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

describe("Test", () => {
  it("should match the snapshot", () => {
    const tree = render(
      <ReduxWrapper>
        <Page params={{ id: 1 }} />
      </ReduxWrapper>
    );

    expect(tree).toMatchSnapshot();
  });

  it("should render the correct title", () => {
    const { getByText } = render(
      <ReduxWrapper>
        <Page params={{ id: 1 }} />
      </ReduxWrapper>
    );

    expect(getByText("User Details")).toBeTruthy();
  });
});
