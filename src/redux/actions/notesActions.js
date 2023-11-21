import axios from 'axios';
import {
  setLoading,
  setError,
  setNotes,
  setNote,
  editNote,
  removeNote,
  selectColor,
} from '../slices/notes';

export const getNotes = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();
  // console.log(userInfo.data, 'see the data');
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.token}`,
        'Content-Type': 'application/json',
      },
    };
    const data = await axios.get(
      `https://notes-app-backend-2q54.onrender.com/api/v1/notes`,

      config
    );
    // console.log(data.data.data, 'notes-particular user');
    const notes = data.data.data;
    dispatch(setNotes(notes));
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Error'
      )
    );
  }
};

export const createNote = (note) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `https://notes-app-backend-2q54.onrender.com/api/v1/notes`,
      note,
      config
    );
    // console.log(data.data);
    // console.log(note.color);
    let result = data.data;
    let color = note.color;
    let font = note.font;
    dispatch(setNote({ ...result, color, font }));
    // dispatch(selectColor(note.color));
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Error,Could not create product'
      )
    );
  }
};

export const updateNote = (_id, note) => async (dispatch, getState) => {
  // console.log(_id, { note }, 'update note......');
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.patch(
      // `http://localhost:8008/api/v1/notes/${_id}`,
      `https://notes-app-backend-2q54.onrender.com/api/v1/notes/${_id}`,
      note,
      config
    );

    // console.log(data.data);
    let result = data.data;
    let color = note.color;
    let font = note.font;
    dispatch(editNote({ ...result, color, font }));
    // dispatch(editNote(data.data));
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Error,Could not update product'
      )
    );
  }
};

export const deleteNote = (_id) => async (dispatch, getState) => {
  // console.log(_id);
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.delete(
      // `http://localhost:8008/api/v1/notes/${_id}`,
      `https://notes-app-backend-2q54.onrender.com/api/v1/notes/${_id}`,

      config
    );
    // console.log(data.data);
    dispatch(removeNote(data.data));
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Error,Could not delete product'
      )
    );
  }
};
