import { DataIndex } from "../routes/index.tsx";

export function cIndex(props:DataIndex) {
    return(
    <div>
      <form method = "get">
        <input type="text" placeholder="Telefono" name = "telefono"/>
        <button type="submit">Enviar</button> 
      </form>
      <h1>Tu telefono es: {props.telefono}</h1>
      <a href={"/country/"+props.country}>{props.country}</a>
    </div>
    )
}

