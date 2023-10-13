import React from "react";
import {
  act,
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { expect } from "@jest/globals";

import { Providers } from "@/lib/providers";
import Form from "./Form";
import { useUsers } from "@/app/hooks/useUsers";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const FormComponent = ({
  newUser,
  id = 0,
  addUser,
  updateUser,
}: {
  newUser: boolean;
  id?: number;
  addUser?: (values: any) => void;
  updateUser?: (values: any) => void;
}) => {
  return (
    <Providers>
      <Form
        newUser={newUser}
        id={id}
        addUser={addUser}
        updateUser={updateUser}
      />
    </Providers>
  );
};

function getWrapper() {
  return ({ children }: { children?: React.ReactNode }) => (
    <Providers>{children}</Providers>
  );
}

describe("User Form", () => {
  it("renders the Form component", () => {
    render(<FormComponent newUser={true} />);

    expect(screen.getByRole("form")).toBeTruthy();
  });

  it("allows user to enter values in input fields", () => {
    render(<FormComponent newUser={true} />);
    const firstNameInput = screen.getByTestId("first_name");
    const lastNameInput = screen.getByTestId("last_name");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });

    expect(firstNameInput.getAttribute("value")).toBe("John");
    expect(lastNameInput.getAttribute("value")).toBe("Doe");
  });

  it("submits the form for a new user", async () => {
    const addUserMock = jest.fn();
    const { getByText, getByLabelText } = render(
      <FormComponent newUser={true} addUser={addUserMock} />
    );

    const firstNameInput = screen.getByTestId("first_name");
    const lastNameInput = screen.getByTestId("last_name");
    const emailInput = screen.getByTestId("email");
    const addressInput = screen.getByTestId("address");
    const phoneInput = screen.getByTestId("phone");
    const genderInput = screen.getByTestId("gender");
    const carInput = screen.getByTestId("car");
    const closePersonInput = screen.getByTestId("close_person");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@doe.com" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(phoneInput, { target: { value: "123-456-7890" } });
    fireEvent.change(genderInput, { target: { value: "male" } });
    fireEvent.change(carInput, { target: { value: "Toyota" } });
    fireEvent.change(closePersonInput, { target: { value: "Jane Doe" } });

    const saveButton = getByText("Save User");
    fireEvent.click(saveButton);

    await waitFor(() => expect(addUserMock).toHaveBeenCalled());
  });

  it("updates an existing user", async () => {
    const updateUserMock = jest.fn();
    const Wrapper = getWrapper();
    const { result } = renderHook(() => useUsers(), { wrapper: Wrapper });

    act(() => {
      result.current.loadUsers();
    });

    render(
      <Wrapper>
        <Form newUser={false} updateUser={updateUserMock} id={2} />
      </Wrapper>
    );

    const updateButton = screen.getByTestId("submit");
    act(() => {
      fireEvent.click(updateButton);
    });

    await waitFor(() => expect(updateUserMock).toHaveBeenCalled());
  });

  it("displays validation error messages", async () => {
    render(<FormComponent newUser={true} />);
    const saveButton = screen.getByText("Save User");
    const firstNameInput = screen.getByTestId("first_name");
    const lastNameInput = screen.getByTestId("last_name");

    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.change(lastNameInput, { target: { value: "" } });
    fireEvent.click(saveButton);

    // Test that validation error messages are displayed for required fields.
    await waitFor(() => {
      expect(screen.getByText("First Name is required")).toBeTruthy();
      expect(screen.getByText("Last Name is required")).toBeTruthy();
      expect(screen.getByText("Email is required")).toBeTruthy();
      expect(screen.getByText("Address is required")).toBeTruthy();
      expect(screen.getByText("Phone is required")).toBeTruthy();
      expect(screen.getByText("Car is required")).toBeTruthy();
      expect(screen.getByText("Gender is required")).toBeTruthy();
      expect(screen.getByText("Close person phone is required")).toBeTruthy();
    });
  });
});
