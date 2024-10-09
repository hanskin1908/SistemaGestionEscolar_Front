import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../services/api';
import Modal from '../Modal/Modal';
import AdminForm from '../components/AdminForm/AdminForm';
import './AdminDashboard.css';

const Dashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setUserRole(userInfo.rol);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
            }
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000); // El mensaje desaparecerá después de 5 segundos

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAdminAdded = (newAdmin: any) => {
        console.log('Nuevo administrador agregado:', newAdmin);
        setSuccessMessage('Administrador registrado con éxito');
        handleCloseModal();
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="sidebar-title">Dashboard</div>
                <ul className="sidebar-menu">
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Usuarios</a></li>
                    <li><a href="#">Cursos</a></li>
                    <li><a href="#">Informes</a></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="header">
                    <h1>Panel de Control</h1>
                    {userRole === 'Administrador' && (
                        <button className="add-admin-btn" onClick={handleOpenModal}>
                            Agregar Administrador
                        </button>
                    )}
                </div>
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
                <div className="dashboard-content">
                    <p>Bienvenido al panel de control. Aquí puedes gestionar todas las funciones del sistema.</p>
                    {/* Más contenido del dashboard aquí */}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <AdminForm onClose={handleCloseModal} onAdminAdded={handleAdminAdded} />
            </Modal>
        </div>
    );
};

export default Dashboard;