import axios from "axios";

export const nextServer = axios.create({
    baseURL:
        (process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || "https://09-auth-teal.vercel.app/") +
        "/api",
    withCredentials: true,
});