import React from 'react'
import { useLocation } from 'react-router-dom'

const Resume = () => {
    const location = useLocation();

    // obtenemos los datos enviados desde la página anterior
    const { formData, age, selectedDiag } = location.state;
    const { name, birthdate, sex, temperature, stature, weight, oxigen, motive } = formData;

    return (
        <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 w-3/5 sm:mx-auto">
                <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-5">
                    <h1 className="text-2xl text-center">Resumen</h1>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-400 p-2 rounded shadow my-4">
                        <h3 className="text-white text-xl">Datos personales</h3>
                    </div>
                    <p className="mb-2">Nombre: {name}</p>
                    <p className="mb-2">Fecha de nacimiento: {birthdate}</p>
                    <p className="mb-2">Edad: {age} años</p>
                    <p className="mb-2">Sexo: {sex}</p>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-400 p-2 rounded shadow my-4">
                        <h3 className="text-white text-xl">Datos antropométricos</h3>
                    </div>
                    <p className="mb-2">Temperatura: {temperature}</p>
                    <p className="mb-2">Estatura: {stature}</p>
                    <p className="mb-2">Peso: {weight}</p>
                    <p className="mb-2">Saturación de oxígeno: {oxigen}</p>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-400 p-2 rounded shadow my-4">
                        <h3 className="text-white text-xl">Datos adicionales</h3>
                    </div>
                    <p className="mb-2">Motivo de consulta:</p>
                    <p className="mb-2">{motive}</p>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-400 p-2 rounded shadow my-4">
                        <h3 className="text-white text-xl">Datos del diagnóstico</h3>
                    </div>
                    <ul>
                        {
                            Object.keys(selectedDiag).map(key => (
                                <li key={key}>
                                    <p>{key}: {selectedDiag[key]}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Resume