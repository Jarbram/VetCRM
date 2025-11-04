export function AppointmentsWidget() {
  const appointments = [
    {
      id: 1,
      time: "10:00 AM",
      pet: "Rocky",
      type: "Revisión General",
    },
    {
      id: 2,
      time: "11:30 AM",
      pet: "Nala",
      type: "Vacunación",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#1A202C] mb-4">Citas del Día (2)</h2>
      <div className="space-y-3">
        {appointments.map((apt) => (
          <div key={apt.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-[#1A202C]">{apt.time}</p>
              <p className="text-sm text-gray-600">{apt.pet}</p>
            </div>
            <p className="text-sm text-gray-500">{apt.type}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
