const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const winston = require('winston');

const app = express();
const port = 3000;

// Winston logger config
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // affichage terminal
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

// Middleware de sécurité CSRF
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Middleware de log à chaque requête
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Route principale
app.get('/', (req, res) => {
  logger.info('Route / appelée');
  res.send('Hello from Observability App!');
});

// Route simulant une erreur
app.get('/error', (req, res) => {
  logger.error('Erreur simulée !');
  res.status(500).send('Erreur serveur');
});

// Feature Toggle codé en dur (A ou B)
const featureToggle = 'A'; // change entre 'A' et 'B' pour activer l'une ou l'autre

// Route de test A/B
app.get('/welcome', (req, res) => {
  const userId = Math.floor(Math.random() * 1000); // Simule un ID utilisateur

  if (featureToggle === 'A') {
    logger.info(`User ${userId} served version A`);
    res.send('👋 Welcome to version A of our feature!');
  } else {
    logger.info(`User ${userId} served version B`);
    res.send('🌟 Welcome to version B of our feature!');
  }
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  logger.error(`Erreur : ${err.message}`);
  res.status(500).send('Internal Server Error');
});

// Démarrage du serveur
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});
