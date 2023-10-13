import { userSlice } from "../slices/usersSlice/usersSlice";
import { expect } from "@jest/globals";
import { Users } from "@/app/types/users";

const SampleUser = {
  id: 0,
  first_name: "User",
  last_name: "Test",
  email: "user_test@test.com",
  gender: "Male",
  address: "12th Floor",
  phone: "400-910-4543",
  car: "S4",
  close_person: "502-490-5335",
};

const SampleUser2 = {
  id: 0,
  first_name: "User2",
  last_name: "Test2",
  email: "user_test2@test.com",
  gender: "Male",
  address: "12th Floor",
  phone: "400-910-4543",
  car: "S4",
  close_person: "502-490-5335",
};

const SampleUser3 = {
  id: 0,
  first_name: "User3",
  last_name: "Test3",
  email: "user_test3@test.com",
  gender: "Male",
  address: "12th Floor",
  phone: "400-910-4543",
  car: "S4",
  close_person: "502-490-5335",
};

describe("User reducer", () => {
  it("should return the initial state", () => {
    expect(userSlice.reducer(undefined, { type: undefined })).toEqual([]);
  });

  it("should handle a todo being added to an empty list", () => {
    const previousState: Users[] = [];

    expect(
      userSlice.reducer(previousState, userSlice.actions.add(SampleUser))
    ).toEqual([SampleUser]);
  });

  it("should handle a todo being added to an existing list", () => {
    const previousState: Users[] = [SampleUser];

    expect(
      userSlice.reducer(previousState, userSlice.actions.add(SampleUser2))
    ).toEqual([SampleUser, SampleUser2]);
  });
});
