'use client'

import { useState } from 'react'
import { useProductStore } from '@/store/productStore'

export default function ProductForm() {
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    preco: '',
    descricao: '',
    imagem: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Função para formatar preço como R$ 1.234,56
  const formatPrice = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    if (!numbers) return ''
    
    // Converte para número e divide por 100 para ter centavos
    const amount = parseInt(numbers, 10) / 100
    
    // Formata com separadores
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Função para remover máscara e retornar número
  const unmaskPrice = (value: string): number => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    if (!numbers) return 0
    // Divide por 100 para ter o valor correto (centavos)
    return parseInt(numbers, 10) / 100
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = 'Categoria é obrigatória'
    }

    const priceValue = unmaskPrice(formData.preco)
    if (!formData.preco || priceValue <= 0) {
      newErrors.preco = 'Preço deve ser maior que zero'
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    try {
      const { productApi } = await import('@/lib/api')
      // Remove máscara do preço antes de enviar
      const priceValue = unmaskPrice(formData.preco)
      await productApi.create({
        nome: formData.nome,
        categoria: formData.categoria,
        preco: priceValue,
        descricao: formData.descricao,
        quantidade_estoque: 0,
      })

      // Recarregar produtos da página atual
      const { loadProducts, currentPage } = useProductStore.getState()
      await loadProducts(currentPage)

      // Reset form
      setFormData({
        nome: '',
        categoria: '',
        preco: '',
        descricao: '',
        imagem: '',
      })
      setErrors({})
    } catch (error: any) {
      setErrors({ submit: error.message || 'Erro ao cadastrar produto' })
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    
    // Aplicar máscara apenas no campo de preço
    if (name === 'preco') {
      const formatted = formatPrice(value)
      setFormData((prev) => ({ ...prev, [name]: formatted }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Cadastrar Produto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nome ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.nome && (
            <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Categoria *
          </label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.categoria ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.categoria && (
            <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="preco"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preço *
          </label>
          <input
            type="text"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="R$ 0,00"
            className={`w-full px-3 py-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.preco ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.preco && (
            <p className="text-red-500 text-sm mt-1">{errors.preco}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição *
          </label>
          <textarea
            id="descricao"
            name="descricao"
            rows={3}
            value={formData.descricao}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.descricao ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.descricao && (
            <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="imagem"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            URL da Imagem
          </label>
          <input
            type="url"
            id="imagem"
            name="imagem"
            value={formData.imagem}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  )
}

