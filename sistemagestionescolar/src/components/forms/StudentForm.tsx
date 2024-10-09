import React, { useState } from 'react';
import './forms.css';
interface Student {
    name: string;
    email: string;
    grade: string;
}

interface StudentFormProps {
    onSubmit: (student: Student) => void;
    onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [grade, setGrade] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, email, grade });
        setName('');
        setEmail('');
        setGrade('');
    };

    return (
     
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">Agregar Nuevo Estudiante</h2>
            <div className="form-group">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
            </div>
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
            </div>
            <div className="form-group">
                <label htmlFor="grade" className="form-label">Grado</label>
                <input type="text" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required className="form-input" />
            </div>
            <div className="form-buttons">
                <button type="button" onClick={onCancel} className="form-button form-button-cancel">
                    Cancelar
                </button>
                <button type="submit" className="form-button">
                    Agregar Estudiante
                </button>
            </div>
        </form>
    );
};

export default StudentForm;