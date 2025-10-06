import { User } from "@/types/user";
import { nextServer } from "./api";
import { NoteFormType, Note } from "@/types/note";

interface NotesHttpResponse {
    notes: Note[];
    totalPages: number;
}
export interface RegisterRequest {
    email: string;
    password: string;
}
export type LoginRequest = {
    email: string;
    password: string;
};
export async function register(data: RegisterRequest) {
    const response = await nextServer.post<User>("/auth/register", data);
    return response.data;
}
export const getMe = async () => {
    const { data } = await nextServer.get<User>("/users/me");
    return data;
};
export const updateMe = async ({
    username,
}: {
    username: string;
}) => {
    const res = await nextServer.patch<User>("/users/me", { username });
    return res.data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post("/auth/logout");
};

export const login = async (data: LoginRequest) => {
    const res = await nextServer.post<User>("/auth/login", data);
    return res.data;
};

type CheckSessionRequest = {
    success: boolean;
};

export const checkSession = async () => {
    const res = await nextServer.get<CheckSessionRequest>("/auth/session");
    return res.data;
};

export const fetchNotes = async (
    search: string,
    page: number,
    tag: string | undefined
): Promise<NotesHttpResponse> => {
    const params = {
        ...(search && { search }),
        tag,
        page,
        perPage: 12,
    };

    const response = await nextServer.get<NotesHttpResponse>("/notes", {
        params,
    });
    return response.data;
};

export const createNote = async (note: NoteFormType): Promise<Note> => {
    const response = await nextServer.post<Note>("/notes", note);
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await nextServer.delete<Note>(`/notes/${id}`);
    return response.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
    const response = await nextServer.get<Note>(`/notes/${id}`);
    return response.data;
};
