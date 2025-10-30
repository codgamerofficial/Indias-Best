import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const [colleges, scholarships] = await Promise.all([
      supabase.from('colleges').select('count'),
      supabase.from('scholarships').select('count')
    ])

    const analytics = {
      totalColleges: colleges.data?.length || 0,
      totalScholarships: scholarships.data?.length || 0,
      totalUsers: 150,
      recentApplications: 25,
      popularColleges: [
        { name: 'IIT Delhi', applications: 45 },
        { name: 'IIM Ahmedabad', applications: 38 }
      ]
    }

    return NextResponse.json(analytics)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}