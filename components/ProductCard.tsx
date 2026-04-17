'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'
import type { Product } from '@/lib/mockData'

interface ProductCardProps {
  product: Product
  onBuy: (product: Product) => void
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
          Em até 12x
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">5.0</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-500">
              R$ {product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 ml-2">ou 12x de R$ {(product.price / 12).toFixed(2)}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBuy(product)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            Comprar
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
