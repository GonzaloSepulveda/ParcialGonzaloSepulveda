import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
    el_pais:string,
    capital:string
}

type countryApi = {
    capital:string
}[];



export const handler: Handlers<Data> = {
  async GET(_req: Request, ctx: FreshContext) {
    const el_pais = ctx.params.el_pais;

    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) {
      throw new Error("Tu API_KEY no esta bien definida");
    }
    if(el_pais){
    const apiUrl = "https://api.api-ninjas.com/v1/country?name="+el_pais
    const data = await fetch(apiUrl,{
        headers: {
            'X-Api-Key': API_KEY
          },
    })

    const response:countryApi = await data.json();

    const capital = response[0].capital



    return ctx.render({el_pais,capital})

}
    return ctx.render("");
  },
};



export default function Home(props:PageProps<Data>) {
    return ( 
        <div>
            
            <h1>
                {props.data.el_pais}
            </h1>

            <a href={"/city/"+props.data.capital}>{props.data.capital}</a>
        </div>
    )


}