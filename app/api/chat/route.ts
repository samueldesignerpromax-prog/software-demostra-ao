import { NextResponse } from 'next/server'
import { chatResponses } from '@/lib/mockData'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Resposta inteligente baseada na mensagem
    let response = ""
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('produto') || lowerMessage.includes('catálogo')) {
      response = chatResponses['produtos']
    } else if (lowerMessage.includes('preço') || lowerMessage.includes('valor')) {
      response = chatResponses['preços']
    } else if (lowerMessage.includes('contato') || lowerMessage.includes('humano')) {
      response = chatResponses['contato']
    } else if (lowerMessage.includes('garantia')) {
      response = chatResponses['garantia']
    } else if (lowerMessage.includes('suporte')) {
      response = chatResponses['suporte']
    } else {
      response = "Obrigado pela mensagem! 📱 Um de nossos especialistas irá te atender em breve. Enquanto isso, posso ajudar com:\n\n• Informações sobre produtos\n• Preços e condições\n• Suporte técnico\n\nComo posso ajudar?"
    }
    
    return NextResponse.json({ 
      success: true, 
      response,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao processar mensagem' },
      { status: 500 }
    )
  }
}
