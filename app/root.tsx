import React from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Container } from "~/components/Container/Container";
import { Header } from "~/components/Header/Header";
import { createCart } from "~/services/createCart";
import { getSession } from "~/services/session.server";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import "modern-normalize/modern-normalize.css";
import style from "~/styles/global.module.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);

  return json({ cart: cart.items() });
};

export default function App(): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className={style.body}>
        <Header />

        <section className={style.section}>
          <Container>
            <Outlet />
          </Container>
        </section>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
