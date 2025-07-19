# 🪒 Sistema de Reservas - Peluquería

Sistema web completo para gestión de reservas de peluquería desarrollado con React y Firebase. Permite a los clientes realizar reservas online y a los dueños administrar las citas desde un panel de control.

## ✨ Características

### Para Clientes
- 📅 Reserva de citas online sin necesidad de registro
- 👨‍💼 Selección de peluquero y especialidad
- 🕐 Visualización de horarios disponibles en tiempo real
- 📱 Interfaz responsive para móviles y desktop
- 📍 Información de contacto y ubicación

### Para Administradores
- 🔐 Panel de administración con autenticación
- 📊 Visualización de reservas por fecha
- ❌ Cancelación de reservas
- 👥 Gestión de peluqueros y horarios
- 📱 Acceso desde cualquier dispositivo

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18.2.0
- **Base de Datos:** Firebase Firestore
- **Autenticación:** Firebase Auth
- **Hosting:** Firebase Hosting
- **Routing:** React Router DOM
- **Estilos:** CSS3 con diseño responsive

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Cuenta de Firebase

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd peluqueria-reservas
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura Firebase**
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilita Firestore Database
   - Habilita Authentication (Email/Password)
   - Obtén la configuración de Firebase

4. **Configura las variables de Firebase**
   Edita el archivo `src/firebase.js` con tu configuración:
   ```javascript
   const firebaseConfig = {
     apiKey: "tu-api-key",
     authDomain: "tu-proyecto.firebaseapp.com",
     projectId: "tu-proyecto",
     storageBucket: "tu-proyecto.appspot.com",
     messagingSenderId: "tu-sender-id",
     appId: "tu-app-id"
   };
   ```

5. **Configura las reglas de Firestore**
   En Firebase Console > Firestore Database > Reglas, usa estas reglas:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /reservas/{reservaId} {
         allow create: if request.resource.data.clienteTelefono is string;
         allow read, delete, update: if request.auth != null;
       }
       match /peluqueros/{peluqueroId} {
         allow read: if true;
         allow write: if false;
       }
     }
   }
   ```

6. **Ejecuta el proyecto**
   ```bash
   npm start
   ```

## 📁 Estructura del Proyecto

```
peluqueria-reservas/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BookingForm.js      # Formulario de reservas
│   │   ├── AdminReservas.js    # Panel de administración
│   │   ├── Login.js           # Formulario de login
│   │   ├── Header.js          # Header de la aplicación
│   │   └── ContactMap.js      # Información de contacto
│   ├── App.js                 # Componente principal
│   ├── firebase.js           # Configuración de Firebase
│   ├── styles.css            # Estilos globales
│   └── index.js              # Punto de entrada
└── package.json
```

## 🔧 Configuración Inicial

### 1. Crear Colecciones en Firestore

**Colección: `peluqueros`**
```javascript
{
  "nombre": "Nombre del Peluquero",
  "especialidad": "Corte de cabello, Barba, etc."
}
```

**Colección: `reservas`** (se crea automáticamente)
```javascript
{
  "clienteNombre": "Nombre del Cliente",
  "clienteTelefono": "123456789",
  "peluqueroId": "ID_DEL_PELUQUERO",
  "fecha": "2024-01-15",
  "hora": "14:30",
  "estado": "pendiente",
  "createdAt": "timestamp"
}
```

### 2. Crear Usuarios Administradores

1. Ve a Firebase Console > Authentication
2. Haz clic en "Agregar usuario"
3. Ingresa email y contraseña para los dueños del negocio
4. Estos usuarios podrán acceder al panel de administración

## 📱 Uso

### Para Clientes
1. Accede a la página principal
2. Completa el formulario de reserva:
   - Nombre completo
   - Número de teléfono (solo números)
   - Selecciona peluquero
   - Elige fecha y horario disponible
3. Confirma la reserva

### Para Administradores
1. Haz clic en "Login" en el header
2. Ingresa las credenciales de administrador
3. Accede al panel de reservas
4. Selecciona la fecha para ver las reservas
5. Usa el botón "Cancelar" para eliminar reservas

## 🔒 Seguridad

- ✅ Autenticación requerida para panel de administración
- ✅ Validación de datos en frontend y backend
- ✅ Reglas de Firestore para proteger datos
- ✅ Solo números permitidos en campo de teléfono
- ✅ Validación de fechas y horarios

## 🚀 Despliegue

### Firebase Hosting
1. Instala Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Inicia sesión en Firebase:
   ```bash
   firebase login
   ```

3. Inicializa el proyecto:
   ```bash
   firebase init hosting
   ```

4. Construye el proyecto:
   ```bash
   npm run build
   ```

5. Despliega:
   ```bash
   firebase deploy
   ```

## 🐛 Solución de Problemas

### Error "Missing script: dev"
- Usa `npm start` en lugar de `npm run dev`

### Error al cancelar reservas
- Verifica que las reglas de Firestore permitan borrado para usuarios autenticados
- Asegúrate de estar logueado como administrador

### No se ven los horarios disponibles
- Verifica que existan peluqueros en la colección `peluqueros`
- Asegúrate de que las fechas seleccionadas sean futuras

## 📞 Soporte

Si tienes problemas o preguntas:
- Revisa la consola del navegador para errores
- Verifica la configuración de Firebase
- Asegúrate de que todas las dependencias estén instaladas

## 📄 Licencia

Este proyecto es de uso privado para gestión de peluquería.

---

**Desarrollado con ❤️ para optimizar la gestión de reservas de peluquería**
