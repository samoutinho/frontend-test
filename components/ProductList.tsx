'use client'

import { useEffect, useRef } from 'react'
import { useProductStore } from '@/store/productStore'
import ProductCard from './ProductCard'
import Pagination from './Pagination'

export default function ProductList() {
  const { filteredProducts, currentPage, itemsPerPage, setPage, products } =
    useProductStore()
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    // Evitar requisições duplicadas (React Strict Mode)
    if (hasLoadedRef.current) return
    
    // Se já existem produtos carregados, não fazer nova requisição
    const currentProducts = useProductStore.getState().products
    if (currentProducts.length > 0) {
      hasLoadedRef.current = true
      return
    }

    hasLoadedRef.current = true

    const loadProducts = async () => {
      try {
        const { productApi } = await import('@/lib/api')
        const loadedProducts = await productApi.getAll()
        useProductStore.setState({ products: loadedProducts })
        useProductStore.getState().applyFilters()
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
        // Fallback para mock data se API não estiver disponível
        const mockProducts = [
          {
            id: '1',
            nome: 'Notebook Dell Inspiron 15',
            categoria: 'Eletrônicos',
            preco: 2999.99,
            descricao: 'Notebook Dell Inspiron 15 com processador Intel i5',
            imagem: 'https://via.placeholder.com/300x200?text=Notebook',
          },
          {
            id: '2',
            nome: 'Mouse Logitech MX Master',
            categoria: 'Periféricos',
            preco: 399.99,
            descricao: 'Mouse sem fio Logitech MX Master 3',
            imagem: 'https://via.placeholder.com/300x200?text=Mouse',
          },
        ]
        useProductStore.setState({ products: mockProducts })
        useProductStore.getState().applyFilters()
      }
    }

    loadProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

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
          Mostrando {paginatedProducts.length} de {filteredProducts.length}{' '}
          produtos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}

