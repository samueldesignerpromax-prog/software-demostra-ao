'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Users, MessageCircle, DollarSign, ArrowUp, ArrowDown } from 'lucide-react'
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 147897,
    clients: 234,
    messages: 1247,
    salesByDay: [
      { day: "Seg", sales: 12500 },
      { day: "Ter", sales: 18200 },
      { day: "Qua", sales: 14900 },
      { day: "Qui", sales: 21300 },
      { day: "Sex", sales: 27800 },
      { day: "Sáb", sales: 9800 },
      { day: "Dom", sales: 5200 },
    ]
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 1000),
        messages: prev.messages + Math.floor(Math.random() * 5),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const cards = [
    {
      title: "Vendas Totais",
      value: `R$ ${stats.total.toLocaleString()}`,
      icon: DollarSign,
      change: "+12.5%",
      positive: true,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Clientes Ativos",
      value: stats.clients,
      icon: Users,
      change: "+8.2%",
      positive: true,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Mensagens",
      value: stats.messages,
      icon: MessageCircle,
      change: "+23.1%",
      positive: true,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Ticket Médio",
      value: `R$ ${Math.floor(stats.total / stats.clients).toLocaleString()}`,
      icon: TrendingUp,
      change: "-2.4%",
      positive: false,
      color: "from-orange-500 to-orange-600"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={index}
              className="bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-white to-gray-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`bg-gradient-to-r ${card.color} p-3 rounded-xl`}>
                  <Icon className="text-white w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 ${card.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {card.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span className="text-sm font-semibold">{card.change}</span>
                </div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            </div>
          )
        })}
      </div>

      {/* Gráfico */}
      <div className="bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-white to-gray-50 rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vendas por Dia da Semana</h3>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={stats.salesByDay}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: any) => [`R$ ${value.toLocaleString()}`, 'Vendas']}
            />
            <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="url(#colorSales)" />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Atividades Recentes */}
      <div className="bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-white to-gray-50 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Atividades Recentes</h3>
        <div className="space-y-3">
          {[
            "🎉 Venda concluída - Chatbot Pro AI (R$ 997)",
            "💬 Novo lead - João Silva",
            "⭐ Avaliação 5 estrelas recebida",
            "📊 Meta mensal atingida em 78%",
            "🔄 Integração WhatsApp ativada"
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 dark:text-gray-300">{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
