import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Professor } from '../types';
import ProfessorForm from './forms/ProfessorForm';

const ProfessorList: React.FC = () => {
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        // Aquí normalmente harías una llamada a la API
        // Por ahora, usaremos datos de ejemplo
        setProfessors([
            { id: 1, name: 'Juan Pérez', subject: 'Matemáticas', email: 'juan@example.com' },
            { id: 2, name: 'María García', subject: 'Literatura', email: 'maria@example.com' },
        ]);
    }, []);

    const handleAddProfessor = () => {
        setShowAddForm(true);
    };

    const handleSubmitProfessor = (newProfessor: Professor) => {
        // Aquí normalmente enviarías los datos a la API
        // Por ahora, simplemente agregaremos el nuevo profesor al estado
        setProfessors([...professors, { ...newProfessor, id: professors.length + 1 }]);
        setShowAddForm(false);
    };

    const handleCancelAddProfessor = () => {
        setShowAddForm(false);
    };

   


    return (
        <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>Lista de Profesores</h2>
                <button
                    onClick={handleAddProfessor}
                    style={{
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.2s ease-in-out',
                        transform: 'scale(1)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Plus style={{ marginRight: '0.5rem' }} size={20} />
                    Agregar Profesor
                </button>
            </div>
            {showAddForm && (
                <ProfessorForm onSubmit={handleSubmitProfessor} onCancel={handleCancelAddProfessor} />
            )}
            <table style={{ minWidth: '100%', backgroundColor: 'white' }}>
                <thead>
                    <tr style={{ backgroundColor: '#EDF2F7', color: '#4A5568', textTransform: 'uppercase', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                        <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>Nombre</th>
                        <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>Asignatura</th>
                        <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>Email</th>
                    </tr>
                </thead>
                <tbody style={{ color: '#4A5568', fontSize: '0.875rem', fontWeight: 'light' }}>
                    {professors.map((professor) => (
                        <tr key={professor.id} >
                            <td style={{ padding: '0.75rem 1.5rem', textAlign: 'left', whiteSpace: 'nowrap' }}>{professor.name}</td>
                            <td style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>{professor.subject}</td>
                            <td style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>{professor.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProfessorList;