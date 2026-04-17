'use client'

import { useState } from 'react'
import { LayoutDashboard, ShoppingBag, Users, Sparkles } from 'lucide-react'
import Dashboard from '@/components/Dashboard'
import LeadForm from '@/components/LeadForm'
import Chatbot from '@/components/Chatbot'
import NotificationSystem from '@/components/NotificationSystem'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Produtos', icon: ShoppingBag },
    { id: 'leads', label: 'Captura de Leads', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                SalesBot Pro
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Plataforma de Vendas e Atendimento com IA
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Sistema Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-[73px] z-20">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${
                    activeTab === tab.id
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'products' && <ProductsPage />}
        {activeTab === 'leads' && <LeadForm />}
      </main>

      {/* Chatbot e Notificações */}
      <Chatbot />
      <NotificationSystem />
    </div>
  )
}

// Componente ProductsPage
function ProductsPage() {
  const products = [
    { id: 1, name: "Chatbot Pro AI", price: 997, image: "https://via.placeholder.com/300x200/3b82f6/white?text=Chatbot+Pro", description: "Chatbot com inteligência artificial para atendimento 24/7" },
    { id: 2, name: "Automação de Marketing", price: 1497, image: "https://via.placeholder.com/300x200/8b5cf6/white?text=Marketing+Auto", description: "Sistema completo de automação de marketing digital" },
    { id: 3, name: "CRM Inteligente", price: 1997, image: "https://via.placeholder.com/300x200/10b981/white?text=CRM+Smart", description: "CRM com análise preditiva de vendas" },
    { id: 4, name: "WhatsApp Business API", price: 499, image: "https://via.placeholder.com/300x200/ef4444/white?text=WhatsApp+API", description: "Integração oficial com WhatsApp Business" },
  ]

  const handleBuy = (product: any) => {
    alert(`🎉 Produto adicionado ao carrinho!\n\n${product.name}\nR$ ${product.price}\n\nNosso chatbot entrará em contato para finalizar a compra.`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up">
      {products.map((product) => (
        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-500">R$ {product.price}</span>
              <button
                onClick={() => handleBuy(product)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition"
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
