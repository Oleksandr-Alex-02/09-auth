import axios from "axios";

export const nextServer = axios.create({
    baseURL:
        (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/' + 'api'),
    withCredentials: true,
});


// import axios from "axios";

// export const nextServer = axios.create({
//     baseURL:
//         (process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.study/docs' + 'api'),
//     withCredentials: true,
// });
