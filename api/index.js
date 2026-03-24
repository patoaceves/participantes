// api/index.js
// Función serverless de Vercel.
// Lee _template.html, sustituye el placeholder por el token real
// (guardado en la env var QUERY_ID_PARTICIPANTE del dashboard de Vercel)
// y devuelve el HTML al navegador. El token nunca vive en el repositorio.
//
// IMPORTANTE: el archivo fuente se llama _template.html (no index.html)
// para que Vercel no lo sirva como estático antes de pasar por aquí.

const fs   = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const token    = process.env.QUERY_ID_PARTICIPANTE || '';
  // __dirname es api/ — subimos un nivel para llegar a la raíz del proyecto
  const filePath = path.join(__dirname, '..', 'index.html');
  let   html     = fs.readFileSync(filePath, 'utf8');

  html = html.replace('window.__QUERY_ID_PARTICIPANTE__', JSON.stringify(token));

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
};
