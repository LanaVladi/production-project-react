import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '../const/localstorage';

// const baseUrl = GLOBAL_ISDEV ? 'http://localhost:8000' : 'http://production.com';
// один из вариантов, как можно переопределить адрес бэкэнда в зависимомти от какой-то глобальной переменной
//  baseURL: baseUrl,
// второй вариант: определить baseUrl на этапе сборки из переменных окружения (env)

export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    }
    return config;
});
