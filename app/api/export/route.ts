import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const [colleges, scholarships] = await Promise.all([
      supabase.from('colleges').select('*'),
      supabase.from('scholarships').select('*')
    ])

    const exportData = {
      colleges: colleges.data || [],
      scholarships: scholarships.data || [],
      exportDate: new Date().toISOString(),
      totalRecords: (colleges.data?.length || 0) + (scholarships.data?.length || 0)
    }

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="indias-best-data.json"'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    )
  }
}