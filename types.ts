export enum OrderStatus {
  NEW = 'new',            // Nuovo ordine appena arrivato
  PREPARING = 'preparing',// Ci stai lavorando (es. stai cucinando)
  READY = 'ready',        // Il favore è pronto per essere erogato
  DELIVERING = 'delivering', // Sei in viaggio verso Valentina
  COMPLETED = 'completed' // Favore consegnato con successo!
}

export interface OrderItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
  quantity: number;
  category: 'Cibo' | 'Amore' | 'Logistica';
}

export interface Order {
  id: string;
  date: string;
  timestamp: number;
  message: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  read: boolean;
}

export interface Stats {
  totalFavors: number;
  ordersThisMonth: number;
  completedOrders: number;
  pendingOrders: number;
}