import React, { useState } from 'react';
import { createAdministrator, AdministradorCreateDTO, AdministradorDTO } from '../../services/api';
import './AdminForm.css';

interface AdminFormProps {
    onClose: () => void;
    onAdminAdded: (admin: AdministradorDTO) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ onClose, onAdminAdded }) => {
    const [formData, setFormData] = useState<AdministradorCreateDTO>({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        usuario: {
            nombre: '',
            apellido: '',
            email: '',
            passwordHash: '',  // Cambiado de password a passwordHash
            rol: 'Administrador'
        }
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email' || name === 'nombre' || name === 'apellido') {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                usuario: {
                    ...prevState.usuario,
                    [name]: value
                }
            }));
        } else if (name === 'passwordHash') {  // Cambiado de password a passwordHash
            setFormData(prevState => ({
                ...prevState,
                usuario: {
                    ...prevState.usuario,
                    passwordHash: value  // Cambiado de password a passwordHash
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const validateForm = (): boolean => {
        if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono || !formData.usuario.passwordHash) {
            setError('Todos los campos son obligatorios');
            return false;
        }
        if (!formData.email.includes('@')) {
            setError('El email no es válido');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            console.log('Enviando datos:', formData);
            const response = await createAdministrator(formData);
            console.log('Respuesta recibida:', response);
            onAdminAdded(response);
            onClose();
        } catch (error) {
            console.error('Error completo:', error);
            setError('Error al crear el administrador. Por favor, intente de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <h2>Registrar Nuevo Administrador</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="apellido">Apellido:</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="passwordHash">Contraseña:</label>
                <input
                    type="password"
                    id="passwordHash"
                    name="passwordHash"
                    value={formData.usuario.passwordHash}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="submit-button">Registrar Administrador</button>
                <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
            </div>
        </form>
    );
};

export default AdminForm;