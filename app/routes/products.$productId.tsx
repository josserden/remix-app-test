import React from "react";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";

import { ProductPage } from "~/components/ProductPage/ProductPage";
import { createCart } from "~/services/createCart";
import { getProduct } from "~/services/products.server";
import { commitSession, getSession } from "~/services/session.server";
import { HTTP_STATUS } from "~/utils/http-status";

import type { Product } from "~/types/types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params, "Missing product ID");

  const product: Product = await getProduct(params.productId);

  if (!product) {
    return json({
      status: HTTP_STATUS.CODE.NOT_FOUND,
      message: HTTP_STATUS.MESSAGE.NOT_FOUND,
    });
  }

  return json({ product });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      // @ts-ignore
      title: data?.product.title,
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const productId = formData.get("productId");

  invariant(productId, "Missing product ID");

  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);

  cart.add(productId as string);

  return json(
    {
      success: true,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
};

export default function Product(): React.JSX.Element {
  const data = useLoaderData<typeof loader>();

  return <>{"product" in data && <ProductPage product={data.product} />}</>;
}
