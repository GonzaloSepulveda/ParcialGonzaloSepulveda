import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  la_ciudad: string;
  el_pais: string;
  temp:number
};

type cityApi = {
  latitude: number;
  longitude: number;
  country: string;
}[];

type weatherApi = {
    temp:number
}

export const handler: Handlers<Data> = {
  async GET(_req: Request, ctx: FreshContext) {
    const la_ciudad = ctx.params.la_ciudad;

    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) {
      throw new Error("Tu API_KEY no esta bien definida");
    }
    const apiUrl = "https://api.api-ninjas.com/v1/city?name=" + la_ciudad;


      const data = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
      const response: cityApi = await data.json();

      const el_pais = response[0].country;
      const lat = response[0].latitude;
      const lon = response[0].longitude;


      const weatherUrl= "https://api.api-ninjas.com/v1/weather?lat="+lat+"&lon="+lon
      
      const weatherData = await fetch(weatherUrl,{
        headers: {
            'X-Api-Key': API_KEY
          },
      })

      const responseWeather:weatherApi = await weatherData.json();

      const temp = responseWeather.temp;



      return ctx.render({ la_ciudad, el_pais ,temp});
    

    
  },
};

export default function Home(props: PageProps<Data>) {
  return (
    <div>
      <h1>
        {props.data.la_ciudad}
      </h1>

      <a href={"/country/" + props.data.el_pais}>{props.data.el_pais}</a>
      <p>La temperatura es: {props.data.temp} grados</p>
    </div>
  );
}
