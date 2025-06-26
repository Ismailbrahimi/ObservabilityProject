const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const app = express();

// Middleware pour parser les cookies (nécessaire pour csurf)
app.use(cookieParser());

// Middleware CSRF, avec stockage du token dans un cookie
app.use(csurf({ cookie: true }));

// Middleware pour gérer les erreurs CSRF
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403);
  res.send('Form tampered with - CSRF token invalid');
});

// Route de test
app.get('/', (req, res) => {
  // On envoie le token CSRF dans la réponse pour les forms frontend
  res.send(`Hello World! CSRF token: ${req.csrfToken()}`);
});

// Démarrage serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
