import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
export type DataIndex = {
  telefono?: string;
  country?: string;
};

type validateApi = {
  is_valid: boolean;
  country: string;
};

export const handler: Handlers<DataIndex> = {
  async GET(req: Request, ctx: FreshContext) {
    const url = new URL(req.url);
    const telefono = url.searchParams.get("telefono");
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) {
      throw new Error("Tu API_KEY no esta bien definida");
    }

    const apiUrl = "https://api.api-ninjas.com/v1/validatephone?number=" +
      telefono;

    if (telefono) {
      const response = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
      const data: validateApi = await response.json();

      const country = data.country;
      const is_valid = data.is_valid;
      if (!is_valid) {
        const headers = new Headers();
        headers.set("location", "/nophone");
        return new Response(null, {
          status: 303,
          headers,
        });
      }

      return ctx.render({ telefono, country });
    }

    return ctx.render("+34674283003");
  },
};

export default function Home(props: PageProps<DataIndex>) {
  return (
    <div>
      <form method="get">
        <input type="text" placeholder="Telefono" name="telefono" />
        <button type="submit">Enviar</button>
      </form>
      <h1>Tu telefono es: {props.data.telefono}</h1>
      <a href={"/country/" + props.data.country}>{props.data.country}</a>
    </div>
  );
}
