import axios from 'axios';
import { setLoading, setError, setNotes, setNote } from '../slices/notes';

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

    dispatch(getNotes());
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
      `https://notes-app-backend-2q54.onrender.com/api/v1/notes/${_id}`,
      note,
      config
    );

    dispatch(getNotes());
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
      `https://notes-app-backend-2q54.onrender.com/api/v1/notes/${_id}`,

      config
    );

    dispatch(getNotes());
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
