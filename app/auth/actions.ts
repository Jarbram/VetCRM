'use server'

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache"

export async function loginAction(email: string, password: string) {
  try {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      },
    )

    console.log("[v0] Attempting login with email:", email)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log("[v0] Login error:", error.message)
      return { error: error.message }
    }

    console.log("[v0] Login successful, user ID:", data.user?.id)
    return { success: true }
  } catch (error) {
    console.log("[v0] Server action error:", error)
    const errorMessage = error instanceof Error ? error.message : "Error al iniciar sesión"
    return { error: errorMessage }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    },
  )

  await supabase.auth.signOut()
  redirect('/auth/login')
}

export async function markReminderAsDone(reminderId: string) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    },
  )

  const { error } = await supabase
    .from('reminders')
    .update({ completed: true })
    .eq('id', reminderId)

  if (error) {
    console.error('Error marking reminder as done:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

