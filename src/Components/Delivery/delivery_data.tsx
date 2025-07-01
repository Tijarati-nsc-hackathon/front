// products.tsx
export interface Product {
  id: string;
  name: string;
    image: string;
    orderStatus: string;
    price: string;
}

export const delivery_data: Product[] = [
  {
    id: "202547896",
    name: "Smartwatch DZ+",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center",
        orderStatus: 'on Hold',
            price: "2500.00DA",

  },
  {
    id: "202547896",
    name: "Smartwatch DZ+",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop&crop=center",
        orderStatus: 'Arrived',
        price: "2500.00DA",


  },
  {
    id: "202547896",
    name: "Smartwatch DZ+",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=80&h=80&fit=crop&crop=center",
        orderStatus: 'Canceled',
                price: "2500.00DA",


  },
  {
    id: "202547896",
    name: "Smartwatch DZ+",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      orderStatus: 'on Hold',
            price: "2500.00DA",


  },
  {
    id: "202547896",
    name: "Smartwatch DZ+",
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=80&h=80&fit=crop&crop=center",
      orderStatus: 'Arrived',
                price: "2500.00DA",


  },
  {
    id: "202547896",
    name: "Smartwatch DZ+",
      image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=80&h=80&fit=crop&crop=center",
      orderStatus: 'Canceled',
      price: "2500.00DA",


    
  }
];