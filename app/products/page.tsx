'use client'

import { products } from '@/lib/mockData'
import ProductCard from '@/components/ProductCard'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function ProductsPage() {
  const handleBuy = (product: any) => {
    toast.success(`🎉 ${product.name} adicionado ao carrinho!`, {
      duration: 3000,
      icon: '🛒'
    })
    
    // Simular abertura do chatbot
    setTimeout(() => {
      toast((t) => (
        <div className="flex items-center gap-2">
          <span>Nosso chatbot vai te ajudar com a compra! 🤖</span>
        </div>
      ), { duration: 4000 })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Nossos Produtos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Soluções completas para alavancar suas vendas
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  )
}
