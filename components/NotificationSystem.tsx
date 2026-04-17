'use client'

import { useState, useEffect } from 'react'
import { Sparkles, X } from 'lucide-react'

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
      const fakeNotifications = [
        { title: "Novo cliente!", message: "João acabou de se cadastrar", type: "success" as const },
        { title: "Venda realizada!", message: "R$ 997 em Chatbot Pro AI", type: "success" as const },
        { title: "Lead qualificado", message: "Maria solicitou contato", type: "info" as const },
      ]
      const newNotification = {
        id: Date.now(),
        ...fakeNotifications[Math.floor(Math.random() * fakeNotifications.length)]
      }
      
      setNotifications(prev => [newNotification, ...prev].slice(0, 5))
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id))
      }, 5000)
    }, 10000)

    return () => clearInterval(interval)
  }, [demoMode])

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
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${getTypeStyles(notification.type)} backdrop-blur-sm border rounded-xl p-4 min-w-[280px] shadow-lg animate-slide-right`}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-xs mt-1 opacity-80">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="hover:bg-white/10 rounded-lg p-1 transition"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
