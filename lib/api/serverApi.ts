
import type { Note, NoteFormType } from "@/types/note";
import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/note";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(
    search: string,
    page: number,
    perPage?: number,
    tag?: string,
) {
    return (await nextServer.get<FetchNotesResponse>("/notes", {
        params: {
            page,
            search,
            perPage,
            tag,
        },
        headers: { Cookie: (await cookies()).toString() }
    })).data;
}

export async function createNote(formData: NoteFormType) {
    return await nextServer.post<Note>("/notes", formData, {
        headers: { Cookie: (await cookies()).toString() }
    });
}

export async function deleteNote(noteId: string) {
    return await nextServer.delete<Note>(`/notes/${noteId}`, {
        headers: { Cookie: (await cookies()).toString() }
    });
}

export async function getIdNotes(noteId: string) {
    return (await nextServer.get<Note>(`/notes/${noteId}`, {
        headers: { Cookie: (await cookies()).toString() }
    })).data;
}

export async function checkServerSession() {
    return await nextServer.get("/auth/session", {
        headers: { Cookie: (await cookies()).toString() }
    });

};

export async function getUserServer(): Promise<User | null> {
    return (await nextServer.get('/users/me', {
        headers: { Cookie: (await cookies()).toString() }
    })).data;
}