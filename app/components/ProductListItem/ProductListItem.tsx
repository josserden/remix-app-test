import { FC } from "react";
import { Link } from "@remix-run/react";

import { Product } from "~/types/types";
import style from "./ProductListItem.module.css";

export const ProductListItem: FC<{
  product: Product;
}> = ({ product }) => {
  return (
    <li className={style.productCard}>
      <Link className={style.productCardLink} to={`/products/${product.id}`}>
        <img
          className={style.productCardImg}
          src={product.thumbnail}
          alt={product.title}
        />

        <div className={style.productInfo}>
          <h2 className={style.productName}>{product.title}</h2>
          <p className={style.productDescription}>{product.description}</p>
          <p className={style.productPrice}>${product.price}</p>
          <button className={style.addToCartButton}>Add to Cart</button>
        </div>
      </Link>
    </li>
  );
};
