import React from "react";
import { useLocation, useMatches } from "@remix-run/react";
import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
let isMount = true;
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});
export async function loader({ request }: LoaderArgs) {
  return json({ user: await getUser(request) });
}
export default function App() {
  let location = useLocation();
  let matches = useMatches();

  React.useEffect(() => {
    let mounted = isMount;
    isMount = false;
    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener("controllerchange", listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
    }
  }, [location, matches]);

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta /> <Links />
      </head>
      <body className="flex min-h-screen w-screen flex-col items-center gap-6 bg-backgroundGradient bg-gradient-to-b from-background to-transparent text-secondary dark:bg-darkbackgroundGradient dark:from-darkbackground dark:text-darksecondary">
        <Outlet /> <ScrollRestoration /> <Scripts /> <LiveReload />
      </body>
    </html>
  );
}
