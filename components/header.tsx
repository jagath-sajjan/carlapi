"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-slate-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              Carl<span className="text-emerald-500">api</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
