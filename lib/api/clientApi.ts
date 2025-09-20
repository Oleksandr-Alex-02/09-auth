'use client'

import { nextServer } from "./api";
import { User, UserAuthRequest } from "@/types/note";
import type { Note, NoteFormType } from "@/types/note";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export type CheckSessionRequest = {
    success: boolean;
}

export async function register(data: UserAuthRequest) {
    return (await nextServer.post<User>('/auth/register', data)).data
}

export async function login(data: UserAuthRequest) {
    return (await nextServer.post<User>('/auth/login', data)).data
}

export async function logout() {
    await nextServer.post('/auth/logout');
}

export async function checkSession() {
    return (await nextServer.get<CheckSessionRequest>('/auth/session')).data.success
}

export async function getUser(): Promise<User> {
    return (await nextServer.get('/users/me')).data;
}

export async function updateUser(user: { username: string }): Promise<User> {
    return (await nextServer.patch('/users/me', user)).data;
}

export async function fetchNotes(
    search: string,
    page: number,
    perPage?: number,
    tag?: string,
) {
    return (await nextServer.get<FetchNotesResponse>("/notes", {
        params: {
            search,
            page,
            perPage,
            tag,
        },
    })).data;
}

export async function createNote(formData: NoteFormType) {
    return (await nextServer.post<Note>("/notes", formData)).data;
}

export async function deleteNote(noteId: string) {
    return (await nextServer.delete<Note>(`/notes/${noteId}`)).data;
}

export async function fetchNoteById(noteId: string) {
    return (await nextServer.get<Note>(`/notes/${noteId}`)).data;
}
