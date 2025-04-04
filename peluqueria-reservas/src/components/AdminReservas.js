import { useState, useEffect } from 'react'; // Añade esta línea
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Asegúrate que la ruta sea correcta

function AdminReservas() {
  const [reservas, setReservas] = useState([]);

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
    }
  };

  return (
    <div className="admin-container">
      <h2>Reservas del día</h2>
      <input 
        type="date" 
        onChange={(e) => cargarReservas(e.target.value)} 
        className="admin-input"
      />
      
      {reservas.length > 0 ? (
        <table className="reservas-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Hora</th>
              <th>Peluquero</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(reserva => (
              <tr key={reserva.id}>
                <td>{reserva.clienteNombre}</td>
                <td>{reserva.hora}</td>
                <td>{reserva.peluqueroId}</td>
                <td>{reserva.clienteTelefono}</td>
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