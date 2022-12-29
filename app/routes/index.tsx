import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="grid max-w-[32rem] grid-cols-2">
      <h1 className="col-span-2 w-full text-center text-3xl">Remix PWA Docs</h1>
      <div className=""></div>
    </main>
  );
}
