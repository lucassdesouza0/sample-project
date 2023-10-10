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

import { Providers } from "@/lib/providers";
import Form from "./Form";
import { useUsers } from "@/app/hooks/useUsers";

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

test("renders the Form component", () => {
  render(<FormComponent newUser={true} />);
});

test("allows user to enter values in input fields", () => {
  render(<FormComponent newUser={true} />);
  const firstNameInput = screen.getByTestId("first_name");
  const lastNameInput = screen.getByTestId("last_name");

  fireEvent.change(firstNameInput, { target: { value: "John" } });
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });

  expect(firstNameInput.getAttribute("value")).toBe("John");
  expect(lastNameInput.getAttribute("value")).toBe("Doe");
});

test("submits the form for a new user", () => {
  const addUserMock = jest.fn();
  const { getByText, getByLabelText } = render(
    <FormComponent newUser={true} addUser={addUserMock} />
  );

  const saveButton = getByText("Save User");
  fireEvent.click(saveButton);

  expect(addUserMock).toHaveBeenCalled();
});

test("submits the form for an existing user", () => {
  const updateUserMock = jest.fn((values) => {
    console.log("MOCKED VALUES", values);
  });
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

  expect(updateButton).toBeCalledTimes(1);
});

test.only("displays validation error messages", async () => {
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
