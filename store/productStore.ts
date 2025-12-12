import { create } from 'zustand'
import { Product, FilterState, SortOption, SortOrder, PaginatedResponse } from '@/lib/types'

interface ProductStore {
  products: Product[]
  filteredProducts: Product[]
  filters: FilterState
  currentPage: number
  itemsPerPage: number
  totalPages: number
  total: number
  isLoading: boolean
  loadProducts: (page?: number, limit?: number) => Promise<void>
  addProduct: (product: Omit<Product, 'id'>) => void
  setFilters: (filters: Partial<FilterState>) => void
  applyFilters: () => void
  setPage: (page: number) => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  filters: {
    searchName: '',
    minPrice: null,
    maxPrice: null,
    sortBy: 'nome',
    sortOrder: 'asc',
  },
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 0,
  total: 0,
  isLoading: false,

  loadProducts: async (page?: number, limit?: number) => {
    set({ isLoading: true })
    try {
      const { productApi } = await import('@/lib/api')
      const currentPage = page || get().currentPage
      const itemsPerPage = limit || get().itemsPerPage
      const response: PaginatedResponse<Product> = await productApi.getAll(currentPage, itemsPerPage)
      
      set({
        products: response.data,
        filteredProducts: response.data,
        totalPages: response.totalPages,
        total: response.total,
        currentPage: response.page,
        itemsPerPage: response.limit,
        isLoading: false,
      })
      
      // Aplicar filtros locais após carregar
      get().applyFilters()
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
      set({ isLoading: false })
    }
  },

  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: generateId(),
    }
    set((state) => ({
      products: [...state.products, newProduct],
    }))
    get().applyFilters()
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1,
    }))
    // Recarregar produtos quando filtros mudarem (backend não suporta filtros ainda)
    get().applyFilters()
  },

  applyFilters: () => {
    const { products, filters } = get()
    let filtered = [...products]

    // Filter by name
    if (filters.searchName) {
      filtered = filtered.filter((p) =>
        p.nome.toLowerCase().includes(filters.searchName.toLowerCase())
      )
    }

    // Filter by price range
    if (filters.minPrice !== null) {
      filtered = filtered.filter((p) => p.preco >= filters.minPrice!)
    }
    if (filters.maxPrice !== null) {
      filtered = filtered.filter((p) => p.preco <= filters.maxPrice!)
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (filters.sortBy) {
        case 'nome':
          aValue = a.nome.toLowerCase()
          bValue = b.nome.toLowerCase()
          break
        case 'preco':
          aValue = a.preco
          bValue = b.preco
          break
        case 'categoria':
          aValue = a.categoria.toLowerCase()
          bValue = b.categoria.toLowerCase()
          break
        default:
          return 0
      }

      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1
      return 0
    })

    set({ filteredProducts: filtered })
  },

  setPage: (page) => {
    set({ currentPage: page })
    // Recarregar produtos da página solicitada
    get().loadProducts(page)
  },
}))

