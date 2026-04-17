'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, X, Sparkles } from 'lucide-react'
import { generateNotification } from '@/lib/mockData'

interface Notification {
  id: number
  title: string
  message: string
  type: 'success' | 'info' | 'warning'
}

export default function NotificationSystem() {
  const [demoMode, setDemoMode] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (!demoMode) return

    const interval = setInterval(() => {
      const fakeNotification = generateNotification()
      const newNotification: Notification = {
        id: Date.now(),
        title: fakeNotification.title,
        message: fakeNotification.message,
        type: fakeNotification.type as any
      }
      
      setNotifications(prev => [newNotification, ...prev].slice(0, 5))
      
      // Remover notificação após 5 segundos
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id))
      }, 5000)
    }, 10000) // Notificação a cada 10 segundos

    return () => clearInterval(interval)
  }, [demoMode])

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'success': return 'bg-green-500/10 border-green-500/20 text-green-500'
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
      default: return 'bg-blue-500/10 border-blue-500/20 text-blue-500'
    }
  }

  return (
    <>
      {/* Botão Modo Demonstração */}
      <button
        onClick={() => setDemoMode(!demoMode)}
        className={`fixed top-20 right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
          demoMode 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
            : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        <Sparkles className={`w-4 h-4 ${demoMode ? 'animate-pulse' : ''}`} />
        {demoMode ? 'Modo Demonstração Ativo' : 'Ativar Modo Demonstração'}
      </button>

      {/* Notificações */}
      <div className="fixed top-24 right-6 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`${getTypeStyles(notification.type)} backdrop-blur-sm border rounded-xl p-4 min-w-[280px] shadow-lg`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                  <p className="text-xs mt-1 opacity-80">{notification.message}</p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="hover:bg-white/10 rounded-lg p-1 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
