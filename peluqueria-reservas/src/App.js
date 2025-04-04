import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import AdminReservas from './components/AdminReservas';
import Login from './components/Login';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import ContactMap from './components/ContactMap';
import './index.css';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <Router>
      <Header user={user} /> {/* Pasamos el estado user al Header */}
      <Routes>
        {/* Página principal unificada */}
        <Route 
          path="/" 
          element={
            <div className="main-content">
              <BookingForm />
              <ContactMap />
            </div>
          } 
        />
        
        <Route path="/admin" element={user ? <AdminReservas /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App; 