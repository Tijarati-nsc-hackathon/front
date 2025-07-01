// products.tsx
export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  stockStatus: string;
  stockColor: "green" | "red";
  totalOrders: number;
}

export const products: Product[] = [
  {
    id: "202547896",
    name: "Smartwatch DZ+",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center",
    price: "2500.00DA",
    stockStatus: "Out of Stock",
    stockColor: "red",
    totalOrders: 100
  },
  {
    id: "202547896",
    name: "Smartwatch DZ+",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop&crop=center",
    price: "2500.00DA",
    stockStatus: "In Stock (45)",
    stockColor: "green",
    totalOrders: 100
  },
  {
    id: "202547896",
    name: "Smartwatch DZ+",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=80&h=80&fit=crop&crop=center",
    price: "2500.00DA",
    stockStatus: "Out of Stock",
    stockColor: "red",
    totalOrders: 100
  },
  {
    id: "202547896",
    name: "Smartwatch DZ+",
image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    price: "2500.00DA",
    stockStatus: "In Stock (45)",
    stockColor: "green",
    totalOrders: 100
  },
  {
    id: "202547896",
    name: "Smartwatch DZ+",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=80&h=80&fit=crop&crop=center",
    price: "2500.00DA",
    stockStatus: "Out of Stock",
    stockColor: "red",
    totalOrders: 100
  },
  {
    id: "202547896",
    name: "Smartwatch DZ+",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=80&h=80&fit=crop&crop=center",
    price: "2500.00DA",
    stockStatus: "In Stock (45)",
    stockColor: "green",
    totalOrders: 100
  }
];