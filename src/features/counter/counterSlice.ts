// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 10,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    /** increment
     * ideally, in the old redux, this mutating code would be unacceptable since
     * reducers are supposed to be pure functions that make a copy of the state and
     * returns a new state. This increment function does the same thing however, it
     * uses immer under the hood
     *
     * Immerjs is a js library that takes the current state and creates a draft of it,
     * the changes made to this draft are recorded, replayed and a new immutable state is
     * returned. It uses structural sharing which is a technique that reuses parts of the
     * state that has not been modified. This improves the performance in certain cases
     * and reduces the memory overhead from copying and memory allocation required when
     * updating state.
     *
     * @param state
     */
    increment(state) {
      state.value++;
    },
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, amountAdded } = counterSlice.actions;
export default counterSlice.reducer;
