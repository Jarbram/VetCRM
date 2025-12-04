import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // 🔒 SECURITY: Get and verify user authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth/login", "/auth/sign-up", "/auth/sign-up-success"]
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))

  // Allow access to public routes
  if (isPublicRoute) {
    return supabaseResponse
  }

  // 🔒 SECURITY: Redirect to login if user is not authenticated
  if (!user && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/auth/login"
    redirectUrl.searchParams.set("redirectedFrom", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // 🔒 SECURITY: Verify user has VetProfile for protected routes
  // This ensures users can't access the dashboard without being registered as vets
  if (user && (pathname.startsWith("/dashboard") || pathname.startsWith("/settings"))) {
    const { data: vetData } = await supabase
      .from("vets")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (!vetData) {
      // User is authenticated but doesn't have a vet profile
      // Redirect to a setup page or show error
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = "/auth/sign-up-success"
      return NextResponse.redirect(redirectUrl)
    }
  }

  return supabaseResponse
}

