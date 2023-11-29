import { Link } from "@remix-run/react";
import React from "react";
import { useLoaderData } from "react-router";
import { json, MetaFunction } from "@remix-run/node";

import { getProducts } from "~/services/products.server";
import { ProductList } from "~/components/ProductList/ProductList";

import { ProductsResponse } from "~/types/types";

export const loader = async () => {
  const data: ProductsResponse = await getProducts();

  return json(data);
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
  const data = useLoaderData() as ProductsResponse;

  return <ProductList products={data.products} />;
}
