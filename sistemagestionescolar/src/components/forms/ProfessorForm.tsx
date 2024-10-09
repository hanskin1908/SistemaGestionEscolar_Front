import React, { useState } from 'react';
import './forms.css';
interface Professor {
    name: string;
    email: string;
    subject: string;
}

interface ProfessorFormProps {
    onSubmit: (professor: Professor) => void;
    onCancel: () => void;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({ onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, email, subject });
        setName('');
        setEmail('');
        setSubject('');
    };


       return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">Agregar Nuevo Profesor</h2>
            <div className="form-group">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
            </div>
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
            </div>
            <div className="form-group">
                <label htmlFor="subject" className="form-label">Asignatura</label>
                <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required className="form-input" />
            </div>
            <div className="form-buttons">
                <button type="button" onClick={onCancel} className="form-button form-button-cancel">
                    Cancelar
                </button>
                <button type="submit" className="form-button">
                    Agregar Profesor
                </button>
            </div>
        </form>
    );
};

export default ProfessorForm;