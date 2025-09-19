// app/api/api.ts

import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>

export const api = axios.create({
    baseURL: 'https://notehub-public.goit.study',
    withCredentials: true,
});
