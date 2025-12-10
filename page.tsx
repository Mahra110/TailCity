"use client"

import { VetsPage } from "@/components/vets-page"

export default function Vets() {
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true"
  return <VetsPage isLoggedIn={isLoggedIn} />
}
