import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { user_id, clinic_name, doctor_name, email } = await request.json()

    if (!user_id || !clinic_name || !doctor_name || !email) {
      return NextResponse.json({ message: "Faltan campos requeridos" }, { status: 400 })
    }

    const cookieStore = await cookies()

    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Ignored
          }
        },
      },
    })

    const { data, error } = await supabase.from("vets").insert({
      user_id,
      clinic_name,
      doctor_name,
      email,
    })

    if (error) {
      console.error("[v0] Supabase error:", error)
      return NextResponse.json({ message: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error al crear el perfil" },
      { status: 500 },
    )
  }
}
