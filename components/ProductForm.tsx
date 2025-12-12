'use client'

import { useState } from 'react'
import { useProductStore } from '@/store/productStore'

export default function ProductForm() {
  const addProduct = useProductStore((state) => state.addProduct)
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    preco: '',
    descricao: '',
    imagem: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = 'Categoria é obrigatória'
    }

    if (!formData.preco || parseFloat(formData.preco) <= 0) {
      newErrors.preco = 'Preço deve ser maior que zero'
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    addProduct({
      nome: formData.nome,
      categoria: formData.categoria,
      preco: parseFloat(formData.preco),
      descricao: formData.descricao,
      imagem: formData.imagem || undefined,
    })

    // Reset form
    setFormData({
      nome: '',
      categoria: '',
      preco: '',
      descricao: '',
      imagem: '',
    })
    setErrors({})
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
            type="number"
            id="preco"
            name="preco"
            step="0.01"
            min="0"
            value={formData.preco}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

