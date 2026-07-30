export const adminProducts = [
  {
    id: 1,
    name: 'Cadbury Dairy Milk Silk',
    brand: 'Cadbury',
    category: 'Milk Chocolate',
    price: 14.99,
    stock: 48,
    featured: true,
  },
  {
    id: 2,
    name: 'Ferrero Rocher Hazelnut Chocolate',
    brand: 'Ferrero Rocher',
    category: 'Nut Chocolates',
    price: 18.99,
    stock: 27,
    featured: true,
  },
  {
    id: 3,
    name: 'Lindt Excellence 70% Dark',
    brand: 'Lindt',
    category: 'Dark Chocolate',
    price: 16.5,
    stock: 42,
    featured: false,
  },
]

export const adminOrders = [
  {
    id: 'ORD-1001',
    customer: 'Aisha Khan',
    total: 48.5,
    status: 'Pending',
    items: 3,
  },
  {
    id: 'ORD-1002',
    customer: 'Noah Patel',
    total: 29.99,
    status: 'Shipped',
    items: 2,
  },
  {
    id: 'ORD-1003',
    customer: 'Mina Ali',
    total: 64.25,
    status: 'Delivered',
    items: 4,
  },
]

export const adminUsers = [
  {
    id: 1,
    name: 'Aisha Khan',
    email: 'aisha@example.com',
    role: 'Customer',
  },
  {
    id: 2,
    name: 'Noah Patel',
    email: 'noah@example.com',
    role: 'Customer',
  },
  {
    id: 3,
    name: 'Mina Ali',
    email: 'mina@example.com',
    role: 'Admin',
  },
]
