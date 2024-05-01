export function getPrice(price, discountPercentage) {
    return price * ((100 - discountPercentage) / 100);
}