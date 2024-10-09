import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Student } from '../types';
import StudentForm from './forms/StudentForm';

const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        // Aquí normalmente harías una llamada a la API
        // Por ahora, usaremos datos de ejemplo
        setStudents([
            { id: 1, name: 'Ana Rodríguez', grade: '10°', email: 'ana@example.com' },
            { id: 2, name: 'Carlos Gómez', grade: '11°', email: 'carlos@example.com' },
        ]);
    }, []);

    const handleAddStudent = () => {
        setShowAddForm(true);
        // Aquí iría la lógica para mostrar el formulario de agregar estudiante
    };
    const handleSubmitStudent = (newStudent: Student) => {
        // Aquí normalmente enviarías los datos a la API
        // Por ahora, simplemente agregaremos el nuevo profesor al estado
        setStudents([...students, { ...newStudent, id: students.length + 1 }]);
        setShowAddForm(false);
    };

    const handleCancelAddStudent = () => {
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
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>Lista de Estudiantes</h2>
                <button
                    onClick={handleAddStudent}
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
                    Agregar Estudiante
                </button>
            </div>
            {showAddForm && (
                <StudentForm onSubmit={handleSubmitStudent} onCancel={handleCancelAddStudent} />
            )}
            <table style={{ minWidth: '100%', backgroundColor: 'white' }}>
                <thead>
                    <tr style={{ backgroundColor: '#EDF2F7', color: '#4A5568', textTransform: 'uppercase', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                        <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>Nombre</th>
                        <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>Grado</th>
                        <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>Email</th>
                    </tr>
                </thead>
                <tbody style={{ color: '#4A5568', fontSize: '0.875rem', fontWeight: 'light' }}>
                    {students.map((student) => (
                        <tr key={student.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                            <td style={{ padding: '0.75rem 1.5rem', textAlign: 'left', whiteSpace: 'nowrap' }}>{student.name}</td>
                            <td style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>{student.grade}</td>
                            <td style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;