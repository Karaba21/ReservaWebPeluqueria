import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const BookingForm = () => {
  const [peluqueros, setPeluqueros] = useState([]);
  const [selectedPeluquero, setSelectedPeluquero] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [horarios, setHorarios] = useState([]);

  // Cargar peluqueros desde Firestore
  useEffect(() => {
    const fetchPeluqueros = async () => {
      const q = query(collection(db, "peluqueros"));
      const querySnapshot = await getDocs(q);
      const peluquerosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPeluqueros(peluquerosData);
    };
    fetchPeluqueros();
  }, []);

  // Cargar horarios ocupados al seleccionar peluquero y fecha
  useEffect(() => {
    if (selectedPeluquero && selectedDate) {
      const fetchHorarios = async () => {
        const q = query(
          collection(db, "reservas"),
          where("peluqueroId", "==", selectedPeluquero),
          where("fecha", "==", selectedDate.toISOString().split('T')[0])
        );
        const querySnapshot = await getDocs(q);
        const horariosOcupados = querySnapshot.docs.map(doc => doc.data().hora);
        // Ejemplo: horarios disponibles de 9:00 a 18:00
        const todosHorarios = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
        setHorarios(
          todosHorarios.map(hora => ({
            hora,
            disponible: !horariosOcupados.includes(hora)
          }))
        );
      };
      fetchHorarios();
    }
  }, [selectedPeluquero, selectedDate]);

  return (
    <section className="booking-form">
      <h2>Reserva tu cita</h2>
      <div className="form-group">
        <label>Peluquero:</label>
        <select
          value={selectedPeluquero}
          onChange={(e) => setSelectedPeluquero(e.target.value)}
        >
          <option value="">Selecciona un peluquero</option>
          {peluqueros.map(peluquero => (
            <option key={peluquero.id} value={peluquero.id}>
              {peluquero.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Fecha:</label>
        <input
          type="date"
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>
      {selectedDate && (
        <div className="horarios">
          <h3>Horarios disponibles:</h3>
          <div className="horarios-grid">
            {horarios.map((slot, index) => (
              <button
                key={index}
                className={`horario-btn ${slot.disponible ? 'disponible' : 'ocupado'}`}
                disabled={!slot.disponible}
              >
                {slot.hora}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingForm;