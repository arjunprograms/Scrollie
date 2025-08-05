"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Presentation, ImageIcon, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  plan: string
  usage: {
    slideshows: number
    carousels: number
  }
  limits: {
    slideshows: number
    carousels: number
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(storedUser))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/")
  }

  if (!isMounted) {
    return null
  }

  if (!user) {
    return null
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard",
    },
    {
      name: "Slideshows",
      href: "/dashboard/slideshows",
      icon: Presentation,
      current: pathname === "/dashboard/slideshows",
    },
    {
      name: "Carousels",
      href: "/dashboard/carousels",
      icon: ImageIcon,
      current: pathname === "/dashboard/carousels",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar for desktop */}
      <div className="hidden border-r border-neutral-100 md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-1 flex-col overflow-y-auto pt-8">
          <div className="flex flex-shrink-0 items-center px-6">
            <h1 className="text-2xl font-bold text-black tracking-tight">SCROLLIE</h1>
          </div>
          <div className="mt-10 flex flex-1 flex-col">
            <nav className="flex-1 space-y-2 px-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                    item.current
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${item.current ? "text-white" : "text-neutral-400"}`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-neutral-100 p-6">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-900">
                  {user.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                  <p className="text-xs text-neutral-500">{user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full p-1 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute left-4 top-4 z-50 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-r border-neutral-100 p-0">
            <div className="flex h-full flex-col">
              <div className="flex items-center border-b border-neutral-100 px-6 py-6">
                <h1 className="text-2xl font-bold text-black tracking-tight">SCROLLIE</h1>
              </div>
              <nav className="flex-1 space-y-2 px-6 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                      item.current
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${item.current ? "text-white" : "text-neutral-400"}`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-shrink-0 border-t border-neutral-100 p-6">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-900">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                      <p className="text-xs text-neutral-500">
                        {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-full p-1 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">
          <div className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
