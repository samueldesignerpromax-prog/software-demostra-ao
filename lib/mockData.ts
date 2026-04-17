// Dados fictícios para demonstração

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Chatbot Pro AI",
    price: 997,
    image: "https://via.placeholder.com/300x200/3b82f6/white?text=Chatbot+Pro",
    description: "Chatbot com inteligência artificial para atendimento 24/7",
    category: "Software"
  },
  {
    id: 2,
    name: "Automação de Marketing",
    price: 1497,
    image: "https://via.placeholder.com/300x200/8b5cf6/white?text=Marketing+Auto",
    description: "Sistema completo de automação de marketing digital",
    category: "Marketing"
  },
  {
    id: 3,
    name: "CRM Inteligente",
    price: 1997,
    image: "https://via.placeholder.com/300x200/10b981/white?text=CRM+Smart",
    description: "CRM com análise preditiva de vendas",
    category: "Gestão"
  },
  {
    id: 4,
    name: "WhatsApp Business API",
    price: 499,
    image: "https://via.placeholder.com/300x200/ef4444/white?text=WhatsApp+API",
    description: "Integração oficial com WhatsApp Business",
    category: "Integração"
  },
  {
    id: 5,
    name: "Landing Page Builder",
    price: 299,
    image: "https://via.placeholder.com/300x200/f59e0b/white?text=Page+Builder",
    description: "Crie páginas de alta conversão sem código",
    category: "Ferramentas"
  },
  {
    id: 6,
    name: "Analytics Dashboard",
    price: 799,
    image: "https://via.placeholder.com/300x200/06b6d4/white?text=Analytics",
    description: "Dashboard completo com métricas em tempo real",
    category: "Análise"
  }
]

export interface Lead {
  name: string
  phone: string
  date: string
}

export const mockSales = {
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
}

export const chatResponses: { [key: string]: string } = {
  "produtos": "Temos 6 produtos incríveis! 🚀\n\n1. Chatbot Pro AI - R$ 997\n2. Automação de Marketing - R$ 1.497\n3. CRM Inteligente - R$ 1.997\n4. WhatsApp Business API - R$ 499\n5. Landing Page Builder - R$ 299\n6. Analytics Dashboard - R$ 799\n\nQual te interessa?",
  "preços": "Nossos preços são bastante competitivos!\n\n💰 Chatbot Pro: R$ 997\n💰 Marketing Auto: R$ 1.497\n💰 CRM: R$ 1.997\n💰 WhatsApp API: R$ 499\n💰 Page Builder: R$ 299\n💰 Analytics: R$ 799\n\nOferecemos parcelamento em até 12x!",
  "contato": "Você pode falar conosco:\n📧 Email: contato@salesbotpro.com\n📱 WhatsApp: (11) 99999-9999\n⏰ Horário: Seg-Sex 9h às 18h\n\nEm breve um humano vai te atender!",
  "garantia": "Oferecemos garantia de 30 dias, satisfação garantida ou seu dinheiro de volta! ✅",
  "suporte": "Nosso suporte técnico funciona 24/7 via chat. Tempo médio de resposta: 2 minutos ⚡",
}

export const generateNotification = () => {
  const notifications = [
    { title: "Novo cliente!", message: "João acabou de se cadastrar", type: "success" },
    { title: "Venda realizada!", message: "R$ 997 em Chatbot Pro AI", type: "success" },
    { title: "Lead qualificado", message: "Maria solicitou contato", type: "info" },
    { title: "Meta atingida!", message: "50% da meta diária concluída", type: "warning" },
  ]
  return notifications[Math.floor(Math.random() * notifications.length)]
}
