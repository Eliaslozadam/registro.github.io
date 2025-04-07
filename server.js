const express = require('express');
const path = require('path');
const os = require('os'); // <-- Módulo para obtener la IP

const app = express();
const port = 3000;

// Función para obtener la IP local
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'No se encontró IP local';
}

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
  const localIP = getLocalIP();
  console.log(`
    ====================================
    Servidor corriendo en:
    - Local:      http://localhost:${port}
    - Red local:  http://${localIP}:${port}
    ====================================
  `);
});