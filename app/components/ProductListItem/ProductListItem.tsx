import React, { FC } from "react";
import { Link, useRouteLoaderData, useFetcher } from "@remix-run/react";

import { loader } from "~/root";
import { Product } from "~/types/types";
import style from "./ProductListItem.module.css";

export const ProductListItem: FC<{
  product: Product;
}> = ({ product }) => {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  const fetcher = useFetcher();

  const isInCart = loaderData?.cart.some(
    (item) => Number(item.productId) === product.id,
  );

  return (
    <li className={style.productCard}>
      <img
        className={style.productCardImg}
        src={product.thumbnail}
        alt={product.title}
      />

      <div className={style.productInfo}>
        <Link className={style.productCardLink} to={`/products/${product.id}`}>
          <h2 className={style.productName}>{product.title}</h2>
        </Link>

        <p className={style.productDescription}>{product.description}</p>
        <p className={style.productPrice}>${product.price}</p>

        <fetcher.Form method="post">
          <input type="hidden" name="productId" value={product.id} />
          <button className={style.addToCartButton} disabled={isInCart}>
            {isInCart ? "Added" : "Add to cart"}
          </button>
        </fetcher.Form>
      </div>
    </li>
  );
};
