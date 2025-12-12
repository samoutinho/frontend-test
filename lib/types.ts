export interface Product {
  id: string
  nome: string
  categoria: string
  preco: number
  descricao: string
  imagem?: string
}

export type SortOption = 'nome' | 'preco' | 'categoria'
export type SortOrder = 'asc' | 'desc'

export interface FilterState {
  searchName: string
  minPrice: number | null
  maxPrice: number | null
  sortBy: SortOption
  sortOrder: SortOrder
}

