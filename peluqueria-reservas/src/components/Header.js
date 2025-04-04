import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import logo from '../assets/logo.png'; 

export default function Header({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo Peluquería" />
          </Link>
        </div>
        <h1 className="site-name">Peluquería para hombres</h1>
      </div>
      
      <div className="header-buttons">
        <Link to="/" className="header-btn header-home">
          Inicio
        </Link>
        
        {user ? (
          <>
            <Link to="/admin" className="header-btn header-admin">
              Ver Reservas
            </Link>
            <button onClick={handleLogout} className="header-btn header-logout">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="header-btn header-login">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
}