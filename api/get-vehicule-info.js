// /api/get-vehicule-info.js (Vercel/Netlify Serverless Function)
module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { plate } = req.query;
  if (!plate) {
    return res.status(400).json({ error: "Missing plate parameter" });
  }

  // Utilisation de la clé fournie. Elle peut aussi être surchargée par une variable d'environnement sur l'hébergeur.
  const apiKey = process.env.SIV_API_TOKEN || "7f91d34e65msh2d69ec6c8975bf6p147d95jsn455e3b396047";

  try {
    const cleanPlate = plate.replace(/[^A-Z0-9]/g, '').toUpperCase();
    
    // Requête formatée selon la documentation RapidAPI de l'utilisateur
    const url = `https://api-plaque-immatriculation-siv.p.rapidapi.com/get-vehicule-info?token=TokenDemoRapidapi&host_name=https%3A%2F%2Fapiplaqueimmatriculation.com&immatriculation=${cleanPlate}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'api-plaque-immatriculation-siv.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "SIV API responded with status " + response.status });
    }
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch SIV data: " + error.message });
  }
};
