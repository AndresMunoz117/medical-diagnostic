import { useEffect, useState } from "react";
import Logo from './logo.svg'
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Creamos una variable con los datos personales y antropométricos
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    sex: '',
    temperature: '',
    stature: '',
    weight:'',
    oxigen: '',
    motive: ''
  })
  const { name, birthdate, sex, temperature, stature, weight, oxigen, motive } = formData;

  const [age, setAge] = useState(null); // Edad en años
  const [days, setDays] = useState(null); // Edad en dias
  const [diagnostic, setDiagnostic] = useState([]); // array de objetos de los diagnósticos
  const [filteredDiagnostic, setFilteredDiagnostic] = useState([]); // array de objetos de los diagnósticos filtrados
  const [selectedDiag, setSelectedDiag] = useState(null); // Objeto del diagnóstico seleccionado en el formulario
  const [inputDiag, setInputDiag] = useState(""); // Input para agregar los diagnóticos (texto) en el filtro

  useEffect(()=>{
    // Se utiliza fetch para obtener los datos de los diagnosticos de la API
    fetch('https://api.editandoideas.com/technical-test/cat__cie_sis/')
      .then(response => response.json())
      .then(data => setDiagnostic(data))
      .catch(error => console.error('Error fetching data:', error));
  },[]);

  // función de modificación de las variables de acuerdo al nombre de la variable
  const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value });

  // Función que se encarga  de calcular la edad cada que se modifica la fecha de nacimiento
  useEffect(()=>{
    if (!birthdate || birthdate === '') return;

    // se obtiene la fecha actual y la fecha de nacimiento
    const today = new Date();
    const birthdateObject = new Date(birthdate);

    // se calcula la diferencia entre estas fechas
    const ageDifferenceMilliseconds = today.getTime() - birthdateObject.getTime();

    // se obtiene la edad del paciente en años y se asigna
    const newAge = Math.floor(ageDifferenceMilliseconds / (1000 * 60 * 60 * 24 * 365));
    setAge(newAge);

    // se obtiene la edad del paciente en dias y se asigna
    const newDays = Math.floor(ageDifferenceMilliseconds / (1000 * 60 * 60 * 24));
    setDays(newDays);
  },[birthdate]);

  // Función que se encarga de buscar los diagnosticos correctos cada que se modifica el sexo o la edad en dias
  useEffect(()=>{
    // Función para transformar los codigos '000X' en numeros y verificar si cumple con los limites de edad
    const codeToDays = (linf, lsup) => {
      let num = 0
      let unit = ''
      if (linf === 'NO' && lsup === 'NO') {
        return true;
      } else{
        if (linf === 'NO') {
          linf = 0
        } else {
          num = +linf.slice(0, 3);
          unit = linf.slice(3);
          linf = parseInt(num, 10);
          linf = ageToDays(linf, unit);
        }
        if (lsup === 'NO') {
          lsup = 365000
        } else {
          num = +lsup.slice(0, 3);
          unit = lsup.slice(3);
          lsup = parseInt(num, 10);
          lsup = ageToDays(lsup, unit);
        }
        return days >= linf && days <= lsup;
      }
    }

    // función que convierte un número a su equivalente en dias
    const ageToDays = (num, unit) => {
      let totalDays = 0;
      switch (unit) {
        case "H":
          totalDays += num / 24;
          break;
        case "D":
          totalDays += num;
          break;
        case "M":
          totalDays += num * 30;
          break;
        case "A":
          totalDays += num * 365;
      }
      return totalDays;
    }

    // Verifica el genero del paciente
    const filteredSex = (gender) => {
      if (gender === 'NO') {
        return true;
      } else {
        if (sex === gender) {
          return  true;
        } else {
          return  false;
        }
      }
    }

    // Filtro de búsqueda por edad y género
    const filteredData = diagnostic.filter(item => {
      return codeToDays(item.linf, item.lsup) && filteredSex(item.lsex)
    }).map(item => {
      const label = `${item.catalog_key}-${item.nombre}`;
      return {
        ...item,
        label
      }
    });;

    setFilteredDiagnostic(filteredData)
  },[days, sex]);

  const navigate = useNavigate();

  // Redirecciona a la página de detalle de diagnóstico
  const onSubmit = (e) => {
    e.preventDefault();
    navigate('/resumen', { state: { formData, age, selectedDiag } });
  };

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
              <label className="text-gray-700 mr-2">Nombre completo:</label>
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
                <label className="text-gray-700 mr-2">Fecha de nacimiento:</label>
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
                <label className="text-gray-700 mr-2">Sexo:</label>
                <select
                  name="sex"
                  value={sex}
                  onChange={(e) => onChange(e)}
                  className="border-2 border-gray-300 p-2 w-full rounded-md"
                >
                  <option value="">Selecciona</option>
                  <option value="HOMBRE">Hombre</option>
                  <option value="MUJER">Mujer</option>
                </select>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-300 p-2 rounded shadow my-4">
              <h3 className="text-white text-xl">Datos antropométricos</h3>
            </div>
            <div className="flex items-center mb-2">
              <label className="text-gray-700 mr-2 w-1/2">Temperatura:</label>
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
              <label className="text-gray-700 mr-2 w-1/2">Estatura:</label>
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
              <label className="text-gray-700 mr-2 w-1/2">Peso:</label>
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
              <label className="text-gray-700 mr-2 w-1/2">Saturación de oxigeno:</label>
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
              <label className="text-gray-700 mr-2">Motivo de consulta:</label>
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
                <label className="text-gray-700 mr-2">Diagnóstico:</label>
                <Autocomplete
                  options={filteredDiagnostic}
                  sx={{width: '100%'}}
                  renderInput={(params) => <TextField {...params}/>}
                  onChange={(event, newDiag) => setSelectedDiag(newDiag)}
                  inputValue={inputDiag}
                  onInputChange={(event, newInputDiag) => {setInputDiag(newInputDiag)}}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gray-800 text-white p-2 rounded-md"
              >
                Ver resumen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home