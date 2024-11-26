const formatCurrency = (current: number): string => {
  return current?.toLocaleString("en-us", {
    style: "currency",
    currency: "USD",
  });
};

export default formatCurrency;

export function currencyMask(value?: string) {
  if (!value) return;
  let valorAlterado = value;
	valorAlterado = valorAlterado.replace(/\D/g, ""); // Remove todos os não dígitos
  valorAlterado = valorAlterado.substring(0, 19);
	valorAlterado = valorAlterado.replace(/(\d+)(\d{2})$/, "$1.$2"); // Adiciona a parte de centavos
	valorAlterado = valorAlterado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"); // Adiciona virgula a cada três dígitos
	// valorAlterado = "R$" + valorAlterado;
	return valorAlterado;
}
