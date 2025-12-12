'use client'

import { useProductStore } from '@/store/productStore'
import { SortOption } from '@/lib/types'

export default function ProductFilters() {
  const { filters, setFilters } = useProductStore()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchName: e.target.value })
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null
    setFilters({ minPrice: value })
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null
    setFilters({ maxPrice: value })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ sortBy: e.target.value as SortOption })
  }

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ sortOrder: e.target.value as 'asc' | 'desc' })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Filtros e Ordenação</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Buscar por Nome
          </label>
          <input
            type="text"
            id="search"
            value={filters.searchName}
            onChange={handleSearchChange}
            placeholder="Digite o nome..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preço Mínimo
          </label>
          <input
            type="number"
            id="minPrice"
            step="0.01"
            min="0"
            value={filters.minPrice || ''}
            onChange={handleMinPriceChange}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preço Máximo
          </label>
          <input
            type="number"
            id="maxPrice"
            step="0.01"
            min="0"
            value={filters.maxPrice || ''}
            onChange={handleMaxPriceChange}
            placeholder="9999.99"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="sortBy"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ordenar por
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="nome">Nome</option>
            <option value="preco">Preço</option>
            <option value="categoria">Categoria</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sortOrder"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ordem
          </label>
          <select
            id="sortOrder"
            value={filters.sortOrder}
            onChange={handleOrderChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </select>
        </div>
      </div>
    </div>
  )
}

