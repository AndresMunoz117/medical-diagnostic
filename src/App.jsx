import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from './Home'
import Resume from './Resume'

const App = () => {
    return (
        // Usamos el componente Router para habilitar el enrutamiento de la aplicación
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resumen" element={<Resume /> } />
            </Routes>
        </Router>
    )
}

export default App