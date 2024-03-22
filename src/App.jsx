import { useEffect, useState } from "react";
import Logo from './Logo.svg'

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    gender: '',
    temperature: '',
    stature: '',
    weight:'',
    oxigen: '',
    motive: ''
  })
  const { name, birthdate, gender, temperature, stature, weight, oxigen, motive } = formData;

  const [age, setAge] = useState(null);
  const [days, setDays] = useState(null);

  useEffect(()=>{
    fetch('http://localhost:3001/diagnosticos')
      .then(response => response.json())
      .then(data => {console.log(data)})
      .catch(error => console.error('Error fetching data:', error));
  },[]);

  const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value });

  useEffect(()=>{
    if (!birthdate || birthdate === '') return;

    const today = new Date();
    const birthdateObject = new Date(birthdate);

    const ageDifferenceMilliseconds = today.getTime() - birthdateObject.getTime();
    const newAge = Math.floor(ageDifferenceMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const newDays = Math.floor(ageDifferenceMilliseconds / (1000 * 60 * 60 * 24));

    setAge(newAge);
    setDays(newDays);
  },[birthdate]);

  const onSubmit = async e => {
    e.preventDefault();
    
  }

  return (
    <div className="min-h-screen bg-gray-200 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-3/5 sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h3 className="text-2xl font-bold mb-4">Diagnóstico médico</h3>
          <div>
            <img src={Logo} alt="New Post" className="w-1/2 h-1/2 mx-auto" />
          </div>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="bg-gradient-to-r from-red-500 to-red-300 p-2 rounded shadow mb-4">
              <h3 className="text-white text-xl">Datos personales</h3>
            </div>
            <div className="mb-2">
              <label htmlFor="name" className="text-gray-700 mr-2">Nombre completo:</label>
              <input
                type="text"
                className="border-2 border-gray-300 p-2 w-full rounded-md"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex mb-2 items-center">
              <div className="w-1/2 mr-2">
                <label htmlFor="birthdate" className="text-gray-700 mr-2">Fecha de nacimiento:</label>
                <input
                  type="date"
                  className="border-2 border-gray-300 p-2 w-full rounded-md"
                  name="birthdate"
                  value={birthdate}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="w-1/2 ml-2">
                <label htmlFor="gender" className="text-gray-700 mr-2">Sexo:</label>
                <select
                  value={gender}
                  onChange={(e) => onChange(e)}
                  className="border-2 border-gray-300 p-2 w-full rounded-md"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="HOMBRE">Hombre</option>
                  <option value="MUJER">Mujer</option>
                  <option value="OTRO">Otro</option>
                </select>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-300 p-2 rounded shadow my-4">
              <h3 className="text-white text-xl">Datos antropométricos</h3>
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="temperature" className="text-gray-700 mr-2 w-1/2">Temperatura:</label>
              <input
                type="text"
                className="border-2 border-gray-300 p-2 w-full rounded-md"
                name="temperature"
                value={temperature}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="stature" className="text-gray-700 mr-2 w-1/2">Estatura:</label>
              <input
                type="text"
                className="border-2 border-gray-300 p-2 w-full rounded-md"
                name="stature"
                value={stature}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="weight" className="text-gray-700 mr-2 w-1/2">Peso:</label>
              <input
                type="text"
                className="border-2 border-gray-300 p-2 w-full rounded-md"
                name="weight"
                value={weight}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="oxigen" className="text-gray-700 mr-2 w-1/2">Saturación de oxigeno:</label>
              <input
                type="text"
                className="border-2 border-gray-300 p-2 w-full rounded-md"
                name="oxigen"
                value={oxigen}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-300 p-2 rounded shadow my-4">
              <h3 className="text-white text-xl">Datos adicionales</h3>
            </div>
            <div className="mb-2">
              <label htmlFor="motive" className="text-gray-700 mr-2">Motivo de consulta:</label>
              <textarea
                className="border-2 border-gray-300 p-2 w-full rounded-md"
                name="motive"
                value={motive}
                onChange={e => onChange(e)}
                required
                rows="6"
                cols="50"
              />
            </div>
            <div className="border-red-500 border-dashed border-2 w-full mb-4">
              <div className="m-2">
                <label htmlFor="motive" className="text-gray-700 mr-2">Diagnóstico:</label>
                <select
                  value={gender}
                  onChange={(e) => onChange(e)}
                  className="border-2 border-gray-300 p-2 w-full rounded-md"
                >
                  {/* {genders.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))} */}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white p-2 w-full rounded-md"
            >
              Create Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App