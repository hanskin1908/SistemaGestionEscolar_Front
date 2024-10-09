import axios, { AxiosInstance } from 'axios';

const API_URL = 'https://localhost:7224/api';

export interface UserInfo {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
}

export interface UsuarioCreateDTO {
    nombre: string;
    apellido: string;
    email: string;
    passwordHash: string;
    rol: string;
}

export interface AdministradorCreateDTO {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    usuario: UsuarioCreateDTO;
}

export interface AdministradorDTO {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    usuarioId: number;
    usuario: {
        id: number;
        nombre: string;
        apellido: string;
        email: string;
        rol: string;
    };
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export const createAdministrator = async (adminData: AdministradorCreateDTO): Promise<AdministradorDTO> => {
    try {
        const response = await axiosInstance.post<AdministradorDTO>('/Administrador', adminData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
        }
        throw error;
    }
};

export const getUserInfo = async (): Promise<UserInfo> => {
    try {
        const response = await axiosInstance.get<UserInfo>('/user/info');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
        }
        throw error;
    }
};