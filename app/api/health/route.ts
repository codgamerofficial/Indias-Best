import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('count')
      .limit(1)

    if (error) {
      return NextResponse.json(
        { status: 'error', message: 'Database connection failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Health check failed' },
      { status: 500 }
    )
  }
}