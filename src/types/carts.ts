export type CartProduct = {
  id: number
  title: string
  price: number
  quantity: number
  total: number
  discountPercentage: number
  discountedPrice: number
}

export type Cart = {
  id: number
  userId: number
  total: number
  discountedTotal: number
  totalProducts: number
  totalQuantity: number
  products: CartProduct[]
}

export type CartsResponse = {
  carts: Cart[]
  total: number
  skip: number
  limit: number
}


