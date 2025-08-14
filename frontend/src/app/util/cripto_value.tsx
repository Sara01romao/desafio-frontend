
export async function cripto_value() {
  const data = await fetch("https://economia.awesomeapi.com.br/last/BTC");
  const cripto = await data.json();

  if (!cripto) {
    return
  }

  return cripto.BTCBRL.ask
}