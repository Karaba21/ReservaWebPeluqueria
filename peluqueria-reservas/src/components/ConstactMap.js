import React from 'react';

const ContactMap = () => {
  return (
    <section className="contact-map">
      <h2>Contacto</h2>
      <p>Dirección: Calle Falsa 123, Ciudad</p>
      <p>Teléfono: +123 456 789</p>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209132042!2d-73.987844924525!3d40.74844097138939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTQuMiJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;