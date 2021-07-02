import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_DELETE_FAIL, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS, NOTE_DETAILS_FAIL, NOTE_DETAILS_REQUEST, NOTE_DETAILS_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS } from "../constants/noteConstants";
import Axios from 'axios';

export const listNotes = () => async (dispatch) => {
    dispatch({
      type: NOTE_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/notes`
      );
      dispatch({ type: NOTE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: NOTE_LIST_FAIL, payload: error.message });
    }
  };

export const createNote = (note) => async (dispatch) => {
    dispatch({ type: NOTE_CREATE_REQUEST });
    try {
      const { data } = await Axios.post(
        '/api/notes', note
      );
      dispatch({
        type: NOTE_CREATE_SUCCESS,
        payload: data.note,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: NOTE_CREATE_FAIL, payload: message });
    }
  };

  export const detailsNote = (noteId) => async (dispatch) => {
    dispatch({ type: NOTE_DETAILS_REQUEST, payload: noteId });
    try {
      const { data } = await Axios.get(`/api/notes/${noteId}`);
      dispatch({ type: NOTE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: NOTE_DETAILS_FAIL, payload: message });
    }
  };

  export const updateNote = (note) => async (dispatch) => {
    dispatch({ type: NOTE_UPDATE_REQUEST, payload: note });
    try {
      const { data } = await Axios.put(`/api/notes/${note._id}`, note);
      dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: NOTE_UPDATE_FAIL, error: message });
    }
  };

  export const deleteNote = (noteId) => async (dispatch) => {
    dispatch({ type: NOTE_DELETE_REQUEST, payload: noteId });
    try {
      await Axios.delete(`/api/NOTEs/${noteId}`);
      dispatch({ type: NOTE_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: NOTE_DELETE_FAIL, payload: message });
    }
  };