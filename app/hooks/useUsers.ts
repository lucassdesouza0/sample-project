// Path: condo-admin/app/hooks/users.ts
import { useEffect } from "react";

import mockData from "@/lib/mock_data.json";
import { selectUsers, useDispatch, useSelector, userSlice } from "@/lib/redux";
import { Users } from "../types/users";

export const useUsers = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  const loadUsers = () => {
    if (users.length > 0) return;
    dispatch(userSlice.actions.load(mockData));
  };

  const getUsersFromDb = () => {
    // setUsers(getUsers());
  };

  const getUserById = (id: number) => {
    const user = users.at(id - 1);
    return user;
    // return getUserById(id);
  };

  const addUser = (user: Users) => {
    user.id = users.length + 2;
    dispatch(userSlice.actions.add(user));
    // addUser(user);
    // setUsers(getUsers());
  };

  const updateUser = (user: Users) => {
    const newUserList = users.map((u) => {
      if (u.id === user.id) {
        return user;
      }
      return u;
    });

    dispatch(userSlice.actions.load(newUserList));

    // updateUser(user);
    // setUsers(getUsers());
  };

  const deleteUserFromDb = (id: string) => {
    // deleteUser(id);
    // setUsers(getUsers());
  };

  return {
    users,
    loadUsers,
    getUsersFromDb,
    getUserById,
    addUser,
    updateUser,
    deleteUserFromDb,
  };
};
