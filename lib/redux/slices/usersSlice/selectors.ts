/* Instruments */
import type { ReduxState } from "@/lib/redux";

export const selectUsers = (state: ReduxState) => state.user;

export const selectUserById = (state: ReduxState, id: number) => {
  return state.user.find((user) => user.id === id);
};
