"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  variants?: any
}

export default function FeatureCard({ icon, title, description, variants }: FeatureCardProps) {
  return (
    <motion.div variants={variants}>
      <Card className="h-full transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
