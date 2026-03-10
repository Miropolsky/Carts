import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Cart, CartsResponse } from '../types/carts'
import { apiClient } from './client'

type GetCartsParams = {
  limit: number
  skip: number
  userId?: number | null
}

export const getCarts = async ({ limit, skip, userId }: GetCartsParams) => {
  const searchParams = new URLSearchParams()
  searchParams.set('limit', String(limit))
  searchParams.set('skip', String(skip))

  // DummyJSON не поддерживает прямой фильтр по userId в этом эндпоинте,
  // но оставим параметр на будущее/расширение.
  const { data } = await apiClient.get<CartsResponse>(`/carts?${searchParams.toString()}`)
  const filteredCarts =
    userId != null ? data.carts.filter((cart) => cart.userId === userId) : data.carts

  return { ...data, carts: filteredCarts }
}

export const getCart = async (id: number | string) => {
  const { data } = await apiClient.get<Cart>(`/carts/${id}`)
  return data
}

type UpdateCartPayload = {
  id: number
  products: Array<{ id: number; quantity: number }>
}

export const updateCart = async ({ id, products }: UpdateCartPayload) => {
  const { data } = await apiClient.put<Cart>(`/carts/${id}`, {
    merge: true,
    products,
  })
  return data
}

export const useCartsQuery = (params: { page: number; limit: number; userIdFilter: string | null }) => {
  const { page, limit, userIdFilter } = params
  const skip = (page - 1) * limit
  const numericUserId = userIdFilter ? Number(userIdFilter) : null

  return useQuery<CartsResponse>({
    queryKey: ['carts', { limit, skip, userId: numericUserId }],
    queryFn: () => getCarts({ limit, skip, userId: numericUserId }),
  })
}

export const useCartQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['cart', id],
    queryFn: () => getCart(id as string),
    enabled: Boolean(id),
  })
}

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCart,
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['cart', String(updatedCart.id)], updatedCart)
      queryClient.invalidateQueries({ queryKey: ['carts'] })
    },
  })
}


