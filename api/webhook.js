// api/webhook.js
// Proxy serverless que reenvía el payload a Go High Level.
// Al correr server-side no hay restricciones CORS.

const GHL = 'https://services.leadconnectorhq.com/hooks/ek1LQvM0Kyj7fll9nDO7/webhook-trigger/c33b2089-84ff-40fd-8f1d-ebec21aab489';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(GHL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(req.body),
    });

    res.status(response.ok ? 200 : 502).json({ ok: response.ok });
  } catch (e) {
    console.error('Webhook proxy error:', e);
    res.status(500).json({ error: e.message });
  }
};
