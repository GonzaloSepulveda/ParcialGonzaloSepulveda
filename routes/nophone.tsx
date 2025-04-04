
export default function Home() {
  return (
    <div>
      <form method="get">
        <input type="text" placeholder="Telefono" name="telefono" />
        <button type="submit">Enviar</button>
      </form>
      <h1>Tu telefono es invalido</h1>
    </div>
  );
}