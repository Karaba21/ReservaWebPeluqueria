import React from 'react';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import ContactMap from './components/ContactMap';
import './styles.css';

function App() {
  return (
    <div className="app">
      <Header />
      <BookingForm />
      <ContactMap />
    </div>
  );
}

export default App;