export function formatPhone(phone: string): string {
  return phone.replace(/(\+376)(\d{3})(\d{3})/, "$1 $2 $3").replace(/^(\d{3})$/, "$1");
}

export function formatCurrency(value: number, currency = "EUR"): string {
  return new Intl.NumberFormat("ca-AD", { style: "currency", currency, minimumFractionDigits: 3 }).format(value);
}

export function formatRelativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "fa menys d'1h";
  if (hours === 1) return "fa 1h";
  return `fa ${hours}h`;
}
