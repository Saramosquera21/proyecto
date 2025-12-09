// src/components/ProtectedRoute.tsx
import React from "react"
import { Navigate } from "react-router-dom"
import { getToken } from "../lib/storage"

type Props = { children: React.ReactNode }

export default function ProtectedRoute({ children }: Props) {
  const token = getToken()
  if (!token) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}
