/* Instruments */
import type { ReduxState } from "@/lib/redux";

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUsers = (state: ReduxState) => state.user.value;

export const selectUserById = (state: ReduxState, id: number) => {
  return state.user.value.find((user) => user.id === id);
};
