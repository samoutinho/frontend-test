const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
) {
  const token = localStorage.getItem('token')

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro na requisição' }))
    throw new Error(error.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const productApi = {
  getAll: () => apiRequest('/products'),
  getById: (id: string) => apiRequest(`/products/${id}`),
  create: (data: any) => apiRequest('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/products/${id}`, { method: 'DELETE' }),
}

