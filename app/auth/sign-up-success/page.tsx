export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-5xl mb-6">✓</div>
          <h1 className="text-2xl font-bold text-[#1A202C] mb-3">Registro exitoso</h1>
          <p className="text-gray-600 mb-8">
            Por favor revisa tu correo electrónico para confirmar tu cuenta. Una vez confirmada, podrás iniciar sesión.
          </p>
          <a
            href="/auth/login"
            className="block w-full px-6 py-3 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#14B8A6] transition-colors font-medium text-center"
          >
            Ir a iniciar sesión
          </a>
        </div>
      </div>
    </div>
  )
}
