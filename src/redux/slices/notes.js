import { createSlice } from '@reduxjs/toolkit/dist';

const initialState = {
  loading: false,
  error: null,
  notes: [],
  note: null,
  selectedColor: '',
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
      state.selectedColor = '';
    },
    selectColor: (state, { payload }) => {
      console.log(payload);
      state.selectedColor = payload;
    },
    setNote: (state, { payload }) => {
      // console.log(payload);
      state.notes = [...state.notes, payload];
    },
    editNote: (state, { payload }) => {
      const updatedNote = payload;
      // console.log(updatedNote);
      let index = state.notes.findIndex((note) => note._id === updatedNote._id);
      // console.log(index);
      if (index !== -1) {
        state.notes = state.notes.map((note, i) =>
          i === index ? updatedNote : note
        );
      }
    },
    removeNote: (state, { payload }) => {
      // console.log(payload);
      let index = state.notes.findIndex((note) => note._id === payload._id);
      if (index !== -1) {
        state.notes = state.notes.filter((note, i) => i !== index);
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setNotes,
  setNote,
  selectColor,
  editNote,
  removeNote,
} = notesSlice.actions;

export default notesSlice.reducer;
export const notesSelector = (state) => state.notes;
