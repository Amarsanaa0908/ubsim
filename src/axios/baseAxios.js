import axios from 'axios'

const baseAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    header: {
        'Content-Type': 'application/json',
    },
});

export default baseAxios;