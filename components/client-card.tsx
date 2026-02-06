import { MessageCircle, Calendar, FileText, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ClientCard() {
  const clinicalHistory = [
    {
      id: 1,
      date: "15 Oct 2025",
      type: "Vacunación",
      description: "Vacuna Anual Rabia. Todo correcto.",
      status: "completed"
    },
    {
      id: 2,
      date: "05 Jun 2025",
      type: "Consulta",
      description: "Revisión General. Leve otitis tratada.",
      status: "completed"
    },
    {
      id: 3,
      date: "22 Ene 2025",
      type: "Cirugía",
      description: "Castración. Cita de seguimiento agendada.",
      status: "completed"
    },
  ]

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-border bg-muted/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-foreground">Max</h2>
              <Badge variant="outline" className="font-mono text-[10px] uppercase bg-background text-muted-foreground border-border">
                CANINO
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Golden Retriever • <span className="font-medium text-foreground">Carlos Ramírez</span>
            </p>
          </div>

          <Button variant="default" size="sm" className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-2 h-9 px-4 rounded-full font-medium shadow-sm transition-all hover:shadow-md">
            <MessageCircle size={16} />
            <span className="hidden md:inline">WhatsApp</span>
          </Button>
        </div>
      </div>

      {/* Clinical History List */}
      <div className="p-6 flex-1">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <FileText size={14} className="text-primary" />
          Historial Reciente
        </h3>

        <div className="space-y-4">
          {clinicalHistory.map((entry) => (
            <div key={entry.id} className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-[-16px] last:before:bottom-auto before:w-px before:bg-border">
              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-background bg-secondary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
              </div>

              <div className="bg-background rounded-lg border border-border p-3 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase text-primary bg-primary/5 px-1.5 py-0.5 rounded tracking-wide border border-primary/10">
                    {entry.type}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    {entry.date}
                  </span>
                </div>
                <p className="text-sm text-foreground/80 leading-snug">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border bg-muted/5">
        <Button variant="outline" className="w-full text-xs h-8 border-border text-muted-foreground hover:text-foreground">
          Ver Expediente Completo
        </Button>
      </div>
    </div>
  )
}
