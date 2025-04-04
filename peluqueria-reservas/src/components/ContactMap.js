import React from 'react';

const ContactMap = () => {
  return (
    <section className="contact-map">
      <h2>Contacto</h2>
      <p>Dirección: Orinoco 5082, Montevideo, Uruguay</p>
      <p>Teléfono: 1234 5678</p>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.996258586382!2d-56.0987758!3d-34.8959255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f86c75e42616d%3A0x3c4501ee757a9670!2sPeluqueria%20para%20hombres!5e0!3m2!1sen!2sus!4v1712099999999!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;