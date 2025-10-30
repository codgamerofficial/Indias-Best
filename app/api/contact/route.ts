import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    console.log('Contact form submission:', { name, email, subject, message })

    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process contact form' }, 
      { status: 500 }
    )
  }
}