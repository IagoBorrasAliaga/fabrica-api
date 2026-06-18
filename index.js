const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Estado inicial de la fábrica
let fabrica = {
  modoFabrica: "AUTOMATICO",
  alarma: false,
  nivelEnergia: 20,
  puerta: {
    estado: "CERRADA",
    ultimoAcceso: "NINGUNO"
  },
  prensa: {
    estado: "ERROR",
    ciclos: 18,
    error: false
  },
  generador: {
    estado: "NORMAL",
    consumo: 35
  }
};

// GET — obtener estado completo de la fábrica
app.get('/fabrica', (req, res) => {
  res.json(fabrica);
});

// GET — obtener solo la prensa
app.get('/fabrica/prensa', (req, res) => {
  res.json(fabrica.prensa);
});

// GET — obtener solo el generador
app.get('/fabrica/generador', (req, res) => {
  res.json(fabrica.generador);
});

// GET — obtener solo la puerta
app.get('/fabrica/puerta', (req, res) => {
  res.json(fabrica.puerta);
});

// POST — actualizar estado completo
app.post('/fabrica', (req, res) => {
  fabrica = { ...fabrica, ...req.body };
  res.json({ ok: true, fabrica });
});

// POST — abrir/cerrar puerta
app.post('/fabrica/puerta', (req, res) => {
  fabrica.puerta = { ...fabrica.puerta, ...req.body };
  res.json({ ok: true, puerta: fabrica.puerta });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API fábrica corriendo en puerto ${PORT}`);
});