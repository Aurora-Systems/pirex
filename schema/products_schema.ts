interface ProductsSchema {
  user_id: string;
  item_name: string;
  in_stock: number;
  price: number;
  category_id: number; // category id is foreign key in categories table, referencing id
  image_id: string;
  description: string;
  asset_id: null | string;
}

interface CategoriesSchema {
  id: number;
  category: string;
  user_id: string;
}
