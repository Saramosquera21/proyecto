// src/components/LugarCard.tsx
import type { Lugar } from "../lib/lugaresData"
import ConsejosLugar from "./ConsejosLugar"

type Props = {
  lugar: Lugar
  onClick: () => void
}

export default function LugarCard({ lugar, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-4 shadow-sm bg-card text-card-foreground cursor-pointer hover:shadow-md transition"
    >
      <img
        src={lugar.imagen}
        alt={lugar.nombre}
        className="w-full h-48 object-cover rounded mb-3"
      />

      <h3 className="text-lg font-bold">{lugar.nombre}</h3>
      <p className="text-sm text-muted-foreground">
        <strong>Dirección:</strong> {lugar.direccion}
      </p>

      {/* Extra info */}
      {lugar.descripcion && (
        <p className="mt-2 text-sm">{lugar.descripcion}</p>
      )}
      <p className="mt-1 text-sm">
        {lugar.resena} · {lugar.presupuesto}
      </p>

      {/* Consejos específicos según etiquetas */}
      <ConsejosLugar etiquetas={lugar.etiquetas} />
    </div>
  )
}
