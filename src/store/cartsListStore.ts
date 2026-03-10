import { create } from 'zustand'

type CartsListState = {
  page: number
  limit: number
  userIdFilter: string | null
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setUserIdFilter: (userId: string | null) => void
}

export const useCartsListStore = create<CartsListState>((set) => ({
  page: 1,
  limit: 10,
  userIdFilter: null,
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  setUserIdFilter: (userIdFilter) => set({ userIdFilter, page: 1 }),
}))


