import { Calendar, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AppointmentsWidget() {
  const appointments = [
    {
      id: 1,
      time: "10:00",
      pet: "Rocky",
      owner: "Ana G.",
      type: "Revisión General",
      status: "confirmed"
    },
    {
      id: 2,
      time: "11:30",
      pet: "Nala",
      owner: "Carlos R.",
      type: "Vacunación",
      status: "pending"
    },
    {
      id: 3,
      time: "14:15",
      pet: "Thor",
      owner: "Luis M.",
      type: "Cirugía",
      status: "confirmed"
    },
    {
      id: 4,
      time: "16:00",
      pet: "Luna",
      owner: "Maria S.",
      type: "Control",
      status: "pending"
    },
  ]

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-border bg-muted/5 flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Agenda del Día
        </h2>
        <Badge variant="outline" className="font-mono text-xs">
          {new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })}
        </Badge>
      </div>

      <ScrollArea className="flex-1 h-[300px] p-4">
        <div className="space-y-0 text-foreground">
          {appointments.map((apt, index) => (
            <div key={apt.id} className="relative pl-6 pb-6 last:pb-0">
              {/* Connecting Line */}
              {index !== appointments.length - 1 && (
                <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border"></div>
              )}

              {/* Timeline Dot */}
              <div className={`absolute left-1 top-1 w-5 h-5 rounded-full border-4 border-background ${apt.status === 'confirmed' ? 'bg-green-500' : 'bg-amber-400'} shadow-sm z-10 box-content`}></div>

              <div className="bg-background rounded-lg border border-border p-3 ml-2 hover:border-primary/30 transition-all hover:shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/5 px-1.5 rounded">{apt.time}</span>
                  <Badge variant="secondary" className="text-[10px] h-5 font-normal text-muted-foreground">
                    {apt.type}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">{apt.pet}</p>
                    <p className="text-xs text-muted-foreground">{apt.owner}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
