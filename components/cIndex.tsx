import { PageProps } from "$fresh/server.ts";
import { DataIndex } from "../routes/index.tsx";

export function cIndex(props:PageProps<DataIndex>) {
    return(
    <div>
      <form method = "get">
        <input type="text" placeholder="Telefono" name = "telefono"/>
        <button type="submit">Enviar</button> 
      </form>
      <h1>Tu telefono es: {props.data.telefono}</h1>
      <a href={"/country/"+props.data.country}>{props.data.country}</a>
    </div>
    )
}

