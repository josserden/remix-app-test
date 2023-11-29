import React, { FC } from "react";
import { Form, useRouteLoaderData } from "@remix-run/react";

import type { loader } from "~/root";
import { Product } from "~/types/types";
import style from "./ProductPage.module.css";

export const ProductPage: FC<{
  product: Product;
}> = ({ product }) => {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  const priceWithDiscount = product.price - product.discountPercentage;
  const quantity = loaderData?.cart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  ) as number;

  return (
    <div className={style.productPage}>
      <div className={style.productImageColumn}>
        <div className={style.productImage}>
          <img
            className={style.productImageImg}
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
      </div>

      <div className={style.productInfoColumn}>
        <h1 className={style.productName}>{product.title}</h1>

        <p className={style.productDescription}>{product.description}</p>
        <p className={style.productPriceDiscount}>
          ${priceWithDiscount.toFixed(2)}
        </p>
        <p className={style.productPriceOriginal}>was ${product.price}</p>

        <Form method="post">
          <input type="hidden" name="productId" value={product.id} />
          <button type={"submit"} className={style.addToCartButton}>
            {quantity > 0 ? "Add more" : "Add to cart"}
          </button>
        </Form>
      </div>
    </div>
  );
};
