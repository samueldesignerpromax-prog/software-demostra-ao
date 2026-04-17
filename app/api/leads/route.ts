import { NextResponse } from 'next/server'

// Armazenamento temporário em memória (apenas para demonstração)
const leads: Array<{ name: string; phone: string; date: string }> = []

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json()
    
    // Validação simples
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Nome e telefone são obrigatórios' },
        { status: 400 }
      )
    }
    
    // Salvar lead
    const newLead = {
      name,
      phone,
      date: new Date().toISOString()
    }
    
    leads.push(newLead)
    
    // Simular envio para CRM/Email
    console.log('Novo lead capturado:', newLead)
    
    // Retornar sucesso
    return NextResponse.json({ 
      success: true, 
      message: 'Lead capturado com sucesso!',
      lead: newLead
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao capturar lead' },
      { status: 500 }
    )
  }
}

// Endpoint para consultar leads (apenas demonstração)
export async function GET() {
  return NextResponse.json({ 
    success: true, 
    total: leads.length,
    leads 
  })
}
