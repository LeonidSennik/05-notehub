import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;
const headers = { Authorization: token };

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search?: string
): Promise<FetchNotesResponse> => {
  const params = { page, perPage: 12, ...(search && { search }) };
  const { data } = await axios.get(`${BASE_URL}/notes`, { headers, params });
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const { data } = await axios.post(`${BASE_URL}/notes`, note, { headers });
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete(`${BASE_URL}/notes/${id}`, { headers });
  return data;
};