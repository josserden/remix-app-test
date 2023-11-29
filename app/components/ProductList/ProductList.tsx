import { FC } from "react";
import { ProductListItem } from "~/components/ProductListItem/ProductListItem";

import { Product } from "~/types/types";
import style from "./ProductList.module.css";

export const ProductList: FC<{
  products: Product[];
}> = ({ products = [] }) => {
  return (
    <ul className={style.productList}>
      {products.map((product: Product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  );
};
