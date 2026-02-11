// Backend API Server
// Questo file contiene la configurazione del server backend

// Configurazione CORS per permettere richieste dal backoffice
const corsOptions = {
  origin: 'https://delivery-valentina-backoffice.vercel.app', // URL del backoffice locale
  credentials: true,
  optionsSuccessStatus: 200
};

// Esempio di utilizzo di localhost:3000
const BACKOFFICE_URL = 'https://delivery-valentina-backoffice.vercel.app';

// Altre configurazioni che potrebbero usare localhost:3000
const config = {
  backofficeUrl: 'https://delivery-valentina-backoffice.vercel.app',
  allowedOrigins: ['https://delivery-valentina-backoffice.vercel.app']
};

export default config;
