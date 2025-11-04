import { MessageCircle } from "lucide-react"

export function ClientCard() {
  const clinicalHistory = [
    {
      id: 1,
      date: "15 / Oct / 2025",
      description: "Vacuna Anual Rabia. Todo correcto.",
    },
    {
      id: 2,
      date: "05 / Jun / 2025",
      description: "Revisión General. Leve otitis tratada.",
    },
    {
      id: 3,
      date: "22 / Ene / 2025",
      description: "Cirugía menor, castración. Cita de seguimiento agendada.",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1A202C]">Max</h2>
          <p className="text-sm text-gray-600 mt-1">
            Golden Retriever, propiedad de <strong>Carlos Ramírez</strong>
          </p>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-[#2DD4BF] text-white rounded-lg font-medium hover:shadow-md transition-shadow">
          <MessageCircle size={20} />
          Contactar por WhatsApp
        </button>
      </div>

      {/* Clinical History Table */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Historial Clínico</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Fecha</th>
              <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Historial Clínico</th>
            </tr>
          </thead>
          <tbody>
            {clinicalHistory.map((entry) => (
              <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 text-sm text-[#1A202C]">{entry.date}</td>
                <td className="py-4 text-sm text-gray-700">{entry.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
