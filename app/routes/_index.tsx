import React from "react";

import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { createCart } from "~/services/createCart";
import { getProducts } from "~/services/products.server";
import { ProductList } from "~/components/ProductList/ProductList";
import { commitSession, getSession } from "~/services/session.server";

import { ProductsResponse } from "~/types/types";

export const loader = async () => {
  const data: ProductsResponse = await getProducts();

  return json(data);
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

export const meta: MetaFunction = () => {
  return [
    {
      name: "description",
      content: "Products page",
      title: "Products page",
    },
  ];
};

export default function Home(): React.JSX.Element {
  const data = useLoaderData<typeof loader>();

  return <ProductList products={data.products} />;
}
