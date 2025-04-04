import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component, state }: PageProps) {
  
  return (
    <>
    <header class ="head"><a href="/">MiParcial.com</a></header>
    <div>
      <Component />
    </div>
    <footer class ="foot">Copyright Gonzalo Sepulveda</footer>
    </>
  );
}