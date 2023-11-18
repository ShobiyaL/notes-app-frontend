import { createSlice } from '@reduxjs/toolkit/dist';

const initialState = {
  loading: false,
  error: null,
  notes: [],
  note: null,
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setNotes: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.notes = payload;
    },
    // setNote: (state, payload) => {
    //   console.log(payload);
    //   state.notes = [...state.notes, payload];
    //   state.loading = false;
    //   state.error = null;
    // },
  },
});

export const { setLoading, setError, setNotes, setNote } = notesSlice.actions;

export default notesSlice.reducer;
export const notesSelector = (state) => state.notes;
