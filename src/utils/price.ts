export const displayPrice = (price: number) : string => {
    return new Intl.NumberFormat("en", {
        currency: "USD",
        style: "currency",
        maximumFractionDigits: 0,
      }).format(price)
}