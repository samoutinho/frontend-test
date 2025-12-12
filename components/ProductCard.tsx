'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {product.imagem && (
        <div className="relative w-full h-48">
          <Image
            src={product.imagem}
            alt={product.nome}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.nome}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{product.categoria}</p>
        <p className="text-gray-700 mb-3 line-clamp-2">{product.descricao}</p>
        <p className="text-2xl font-bold text-blue-600">
          R$ {Number(product.preco).toFixed(2).replace('.', ',')}
        </p>
      </div>
    </div>
  )
}

