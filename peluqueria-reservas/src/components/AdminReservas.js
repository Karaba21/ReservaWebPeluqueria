import { useState, useEffect } from 'react';
import { query, collection, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function AdminReservas() {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const cargarReservas = async (fecha) => {
    try {
      const q = query(
        collection(db, "reservas"),
        where("fecha", "==", fecha)
      );
      const snapshot = await getDocs(q);
      setReservas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error cargando reservas:", error);
      setMensaje('Error al cargar las reservas');
    }
  };

  const cancelarReserva = async (reservaId) => {
    try {
      await deleteDoc(doc(db, "reservas", reservaId));
      setMensaje('Reserva cancelada con éxito');
      // Recargar las reservas del día actual
      const fechaActual = document.querySelector('input[type="date"]').value;
      if (fechaActual) {
        cargarReservas(fechaActual);
      }
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      setMensaje('Error al cancelar la reserva');
    }
  };

  return (
    <div className="admin-container">
      <h2>Reservas del día</h2>
      <input 
        type="date" 
        onChange={(e) => cargarReservas(e.target.value)} 
        className="admin-input"
        defaultValue={new Date().toISOString().split('T')[0]}
      />
      
      {mensaje && <div className={`mensaje ${mensaje.includes('éxito') ? 'exito' : 'error'}`}>{mensaje}</div>}
      
      {reservas.length > 0 ? (
        <table className="reservas-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Hora</th>
              <th>Peluquero</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(reserva => (
              <tr key={reserva.id}>
                <td>{reserva.clienteNombre}</td>
                <td>{reserva.hora}</td>
                <td>{reserva.peluqueroId}</td>
                <td>{reserva.clienteTelefono}</td>
                <td>
                  <button 
                    className="btn-cancelar"
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
                        cancelarReserva(reserva.id);
                      }
                    }}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay reservas para esta fecha</p>
      )}
    </div>
  );
}

export default AdminReservas;