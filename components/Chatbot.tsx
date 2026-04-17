'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Package,
  PhoneCall,
  Headphones
} from 'lucide-react'
import { chatResponses } from '@/lib/mockData'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! 👋 Sou o assistente virtual da SalesBot Pro. Como posso ajudar você hoje?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('produto') || lowerMessage.includes('catálogo')) {
      return chatResponses['produtos']
    }
    if (lowerMessage.includes('preço') || lowerMessage.includes('valor')) {
      return chatResponses['preços']
    }
    if (lowerMessage.includes('contato') || lowerMessage.includes('humano')) {
      return chatResponses['contato']
    }
    if (lowerMessage.includes('garantia')) {
      return chatResponses['garantia']
    }
    if (lowerMessage.includes('suporte')) {
      return chatResponses['suporte']
    }
    
    return "Ótima pergunta! 🎯 Para te ajudar melhor, você pode:\n\n• Digitar 'produtos' para ver nosso catálogo\n• Digitar 'preços' para informações financeiras\n• Digitar 'contato' para falar com um humano\n\nComo posso te ajudar hoje?"
  }

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText
    if (!messageText.trim()) return

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simular resposta do bot
    setTimeout(() => {
      const response = getBotResponse(messageText)
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const quickButtons = [
    { icon: Package, label: "Ver produtos", action: "produtos" },
    { icon: PhoneCall, label: "Falar com humano", action: "contato" },
    { icon: Headphones, label: "Suporte", action: "suporte" },
  ]

  return (
    <>
      {/* Botão do Chat */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Janela do Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-semibold">Assistente Virtual</h3>
                  <p className="text-blue-100 text-xs">Online • Resposta rápida</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 rounded-lg p-1 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-600'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Buttons */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2 mb-3">
                {quickButtons.map((button, index) => {
                  const Icon = button.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(button.action)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <Icon className="w-4 h-4" />
                      {button.label}
                    </button>
                  )
                })}
              </div>
              
              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
