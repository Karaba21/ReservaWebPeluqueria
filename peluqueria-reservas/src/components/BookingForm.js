import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

const BookingForm = () => {
  const [peluqueros, setPeluqueros] = useState([]);
  const [selectedPeluquero, setSelectedPeluquero] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteTelefono, setClienteTelefono] = useState('');
  const [selectedHora, setSelectedHora] = useState('');
  const [mensaje, setMensaje] = useState('');

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
        const fechaFormateada = selectedDate.toISOString().split('T')[0];
        const q = query(
          collection(db, "reservas"),
          where("peluqueroId", "==", selectedPeluquero),
          where("fecha", "==", fechaFormateada)
        );
        
        const querySnapshot = await getDocs(q);
        const horariosOcupados = querySnapshot.docs.map(doc => doc.data().hora);
        
        // Horarios disponibles de 9:00 a 18:00 cada 30 minutos
        const todosHorarios = [];
        for (let hora = 9; hora <= 18; hora++) {
          todosHorarios.push(`${hora}:00`);
          if (hora < 18) todosHorarios.push(`${hora}:30`);
        }

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

  // Manejar el envío de la reserva
  const handleSubmitReserva = async () => {
    if (!selectedPeluquero || !selectedDate || !selectedHora || !clienteNombre || !clienteTelefono) {
      setMensaje('Por favor complete todos los campos');
      return;
    }

    try {
      await addDoc(collection(db, "reservas"), {
        clienteNombre,
        clienteTelefono,
        peluqueroId: selectedPeluquero,
        fecha: selectedDate.toISOString().split('T')[0],
        hora: selectedHora,
        estado: "pendiente",
        createdAt: serverTimestamp()
      });

      setMensaje('¡Reserva realizada con éxito!');
      // Limpiar formulario
      setClienteNombre('');
      setClienteTelefono('');
      setSelectedHora('');
      // Recargar horarios
      const fechaFormateada = selectedDate.toISOString().split('T')[0];
      const q = query(
        collection(db, "reservas"),
        where("peluqueroId", "==", selectedPeluquero),
        where("fecha", "==", fechaFormateada)
      );
      const querySnapshot = await getDocs(q);
      const horariosOcupados = querySnapshot.docs.map(doc => doc.data().hora);
      setHorarios(prev => prev.map(slot => ({
        ...slot,
        disponible: !horariosOcupados.includes(slot.hora)
      })));
    } catch (error) {
      console.error("Error al guardar reserva:", error);
      setMensaje('Error al realizar la reserva');
    }
  };

  return (
    <section className="booking-form">
      <h2>Reserva tu cita</h2>
      
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          value={clienteNombre}
          onChange={(e) => setClienteNombre(e.target.value)}
          placeholder="Tu nombre completo"
        />
      </div>

      <div className="form-group">
        <label>Teléfono:</label>
        <input
          type="tel"
          value={clienteTelefono}
          onChange={(e) => setClienteTelefono(e.target.value)}
          placeholder="+56912345678"
        />
      </div>

      <div className="form-group">
        <label>Peluquero:</label>
        <select
          value={selectedPeluquero}
          onChange={(e) => setSelectedPeluquero(e.target.value)}
        >
          <option value="">Selecciona un peluquero</option>
          {peluqueros.map(peluquero => (
            <option key={peluquero.id} value={peluquero.id}>
              {peluquero.nombre} - {peluquero.especialidad}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Fecha:</label>
        <input
          type="date"
          min={new Date().toISOString().split('T')[0]}
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
                className={`horario-btn ${!slot.disponible ? 'ocupado' : selectedHora === slot.hora ? 'seleccionado' : 'disponible'}`}
                disabled={!slot.disponible}
                onClick={() => setSelectedHora(slot.hora)}
              >
                {slot.hora}
              </button>
            ))}
          </div>
        </div>
      )}

      {mensaje && <div className={`mensaje ${mensaje.includes('éxito') ? 'exito' : 'error'}`}>{mensaje}</div>}

      <button 
        className="btn-reservar"
        onClick={handleSubmitReserva}
        disabled={!selectedHora}
      >
        Confirmar Reserva
      </button>
    </section>
  );
};

export default BookingForm;