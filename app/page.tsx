import ProductList from '@/components/ProductList'
import ProductForm from '@/components/ProductForm'
import ProductFilters from '@/components/ProductFilters'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Gerenciamento de Produtos
        </h1>
        
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

