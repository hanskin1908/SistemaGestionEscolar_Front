import axios from 'axios';

const API_URL = '/api/auth/';

export interface LoginResponse {
    token: string;
}

export interface RegisterData {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol: string;
}

const AuthService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await axios.post(API_URL + 'login', { email, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    register: async (data: RegisterData): Promise<any> => {
        return axios.post(API_URL + 'register', data);
    },

    getCurrentUser: (): LoginResponse | null => {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    },
};

export default AuthService;