'use client'

import { useEffect, useRef } from 'react'
import { useProductStore } from '@/store/productStore'
import ProductCard from './ProductCard'
import Pagination from './Pagination'

export default function ProductList() {
  const { filteredProducts, currentPage, totalPages, total, isLoading, loadProducts } =
    useProductStore()
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    // Evitar requisições duplicadas (React Strict Mode)
    if (hasLoadedRef.current) return
    hasLoadedRef.current = true

    loadProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">Carregando produtos...</p>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600">
          Mostrando {filteredProducts.length} de {total} produtos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            const { setPage } = useProductStore.getState()
            setPage(page)
          }}
        />
      )}
    </div>
  )
}

