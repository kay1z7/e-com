export interface CardI {
  active: boolean;
  barcode: {
    description: string;
    id: number;
    images: string[];
    selling_price: string;
    title: string;
    storage: {
      id: number;
      name: string;
      slug: null;
      shop: {
        address: string;
        created_at: string;
        delivery_price: number;
        description: string;
        email: null;
        followers: number;
        free_delivery: number;
        icon: string;
        id: number;
        market_active: boolean;
        name: string;
        phone: string;
        self_delivery: boolean;
        slug: string;
        user: string;
        verified: false;
        work_time: string;
      };
    };
  };
  created_at: string;
  id: number;
  in_stock: boolean;
  shop_id: number;
  slug: string;
  sub: boolean;
}

export interface DetailCardI {
  id: number;
  title: string;
  selling_price: string;
  images: string[];
  created_at: string;
  category: {
    id: number;
    name: string;
    slug: string;
    icon: null;
    icon1: null;
    is_active: boolean;
    sizes: {
      id: number;
      name: string;
      value: number;
      category: string;
      amount: number;
    }[];
  };
  barcode_value: string;
  description: string;
  link: string;
  keywords: string[];
  discounted_price: string;
  cost: string;
  tags: string;
  characteristic: {
    characteristics: {
      key: string;
      value: string;
    }[];
  };
  shop_id: number;
}
