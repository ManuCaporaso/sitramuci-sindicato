import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');  // Redirigir a una página de usuario
    } else {
      setErrorMessage('Por favor ingresa un usuario y una contraseña válidos');
    }
  };

  const handleRegister = () => {
    if (!username || !password || !email) {
      setErrorMessage('Por favor llena todos los campos');
    } else if (!/\S+@\S+\.\S+/.test(email)) {  // Validación de email
      setErrorMessage('Por favor ingresa un correo electrónico válido');
    } else if (password.length < 6) {  // Validación de contraseña
      setErrorMessage('La contraseña debe tener al menos 6 caracteres');
    } else {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');  // Redirigir a una página de usuario
    }
  };

  /**
   * Muestra un mensaje de error si hay problemas con el inicio de sesión o registro.
   * @returns {JSX.Element|null} Un elemento JSX que muestra el mensaje de error o null si no hay errores.
   */

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(../../public/fondoLogin.jpg)' }}>
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-3xl sm:text-5xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Bienvenidos a INFO-TRACKER</h2>
        <h3 className="text-xl sm:text-3xl font-normal text-center text-gray-800 mb-6 sm:mb-8">Capturador de novedades</h3>

        {errorMessage && <div className="text-red-600 text-center mb-4">{errorMessage}</div>}

        <div className="flex flex-col sm:flex-row justify-center mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`w-full sm:w-1/2 py-2 text-lg font-medium ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`w-full sm:w-1/2 py-2 text-lg font-medium ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Registro
          </button>
        </div>

        {activeTab === 'login' ? (
          <div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">Usuario</label>
              <input
                type="text"
                id="username"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            >
              Iniciar Sesión
            </button>

            <div className="text-center text-sm text-gray-500 mt-4">
              <p>¿No tienes cuenta? <button onClick={() => setActiveTab('register')} className="text-blue-500 hover:underline">Regístrate</button></p>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">Usuario</label>
              <input
                type="text"
                id="username"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleRegister}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            >
              Registrarse
            </button>

            <div className="text-center text-sm text-gray-500 mt-4">
              <p>¿Ya tienes cuenta? <button onClick={() => setActiveTab('login')} className="text-blue-500 hover:underline">Inicia Sesión</button></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

