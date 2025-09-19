// lib/api/clientApi.ts

import { nextServer } from './api';
import { Note, NoteFormType } from "../types/note"

export interface NoteData {
    notes: Note[];
    totalPages: number;
}
const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// Далі вся типізація і функції запитів
export const fetchNotes = async (
    currentPage: number,
    searchQuery: string,
    perPage?: number,
    tag?: string
): Promise<NoteData> => {
    const response = await nextServer.get<NoteData>("/notes", {
        params: {
            search: searchQuery,
            page: currentPage,
            perPage,
            tag,
        },
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        },
    });

    return response.data;
};

export const getIdNotes = async (noteId: string) => {
    const res = await nextServer.get<Note>(
        `/notes/${noteId}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
}

export const deleteNote = async (noteId: string) => {
    const res = await nextServer.delete<Note>(
        `/notes/${noteId}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
}

export const createNote = async (noteData: NoteFormType) => {
    const res = await nextServer.post<Note>(
        `/notes`, noteData, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
}

// interface NoteUpdate {
//     id: string;
//     title: string,
//     content: string,
//     tag: string,
// }

// export const patchNote = async (noteUpdate: NoteUpdate) => {
//     const res = await nextServer.patch<NoteData>(
//         `/notes/${noteUpdate.id}`, {
//         params: {
//             title: noteUpdate.title,
//             content: noteUpdate.content,
//             tag: noteUpdate.tag,
//         },
//         headers: {
//             accept: "application/json",
//             Authorization: `Bearer ${NOTEHUB_TOKEN}`,
//         }
//     });
//     return res.data;
// }

export type RegisterRequest = {
    email: string;
    password: string;
    userName: string;
};

export type User = {
    id: string;
    email: string;
    userName?: string;
    photoUrl?: string;
    createdAt: Date;
    updatedAt: Date;
};

export const register = async (data: RegisterRequest) => {
    const res = await nextServer.post<User>('/auth/register', data);
    return res.data;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export const login = async (data: LoginRequest) => {
    const res = await nextServer.post<User>('/auth/login', data);
    return res.data;
};

type CheckSessionRequest = {
    success: boolean;
};

export const checkSession = async () => {
    const res = await nextServer.get<CheckSessionRequest>('/auth/session');
    return res.data.success;
};

export const getMe = async () => {
    const { data } = await nextServer.get<User>('/auth/me');
    return data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout')
};

export type UpdateUserRequest = {
    userName?: string;
    photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
    const res = await nextServer.put<User>('/auth/me', payload);
    return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await nextServer.post('/upload', formData);
    return data.url;
};