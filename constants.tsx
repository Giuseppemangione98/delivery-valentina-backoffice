import { Order, OrderStatus } from './types';

// Lasciamo la lista vuota: gli ordini arriveranno dal database reale
export const INITIAL_ORDERS: Order[] = [];

export const RESPONSE_TEMPLATES = [
  "Il tuo desiderio è ordine! Sto arrivando... 🏃‍♂️💨",
  "Ordine ricevuto! Preparati al meglio, Valentina. ❤️",
  "Il tuo Giuseppe è già all'opera per te! 🌹",
  "Consegna speciale in arrivo per la cliente più bella del mondo! ✨",
  "Missione compiuta! Spero che il servizio sia stato di tuo gradimento. ⭐⭐⭐⭐⭐"
];