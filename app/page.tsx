'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProductList from '@/components/ProductList'
import ProductForm from '@/components/ProductForm'
import ProductFilters from '@/components/ProductFilters'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Gerenciamento de Produtos
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductFilters />
            <ProductList />
          </div>

          <div className="lg:col-span-1">
            <ProductForm />
          </div>
        </div>
      </div>
    </main>
  )
}
