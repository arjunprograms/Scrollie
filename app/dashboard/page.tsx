"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Presentation, ImageIcon, Plus, ArrowUpRight, Clock, Sparkles, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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

interface Project {
  id: string
  title: string
  type: "slideshow" | "carousel"
  createdAt: string
  updatedAt: string
  slides?: number // Optional for carousel
  images?: number // Optional for slideshow
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [showTour, setShowTour] = useState(false)
  const [tourStep, setTourStep] = useState(0)

  useEffect(() => {
    setIsMounted(true)
    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(storedUser))

    // Load projects from localStorage
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
      const allProjects = JSON.parse(storedProjects)
      // Sort by updatedAt to show most recent first
      const sortedProjects = allProjects.sort(
        (a: Project, b: Project) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      setRecentProjects(sortedProjects.slice(0, 3)) // Show only top 3 recent projects
    }

    // Onboarding tour: show only on first visit
    if (!localStorage.getItem("scrollie_tour_seen")) {
      setShowTour(true)
      setTourStep(0)
    }
  }, [router])

  const handleNextTour = () => {
    if (tourStep < 2) setTourStep(tourStep + 1)
    else {
      setShowTour(false)
      localStorage.setItem("scrollie_tour_seen", "1")
    }
  }

  if (!isMounted || !user) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="relative">
      {/* Onboarding Tour Overlay */}
      {showTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xs flex flex-col items-center text-center gap-4 animate-fade-in">
            {tourStep === 0 && (
              <>
                <Sparkles className="h-8 w-8 text-purple-500 mb-2" />
                <div className="font-bold text-lg">Paste your idea here</div>
                <div className="text-sm text-neutral-600">Start by clicking <span className="font-semibold">New Carousel</span> or <span className="font-semibold">New Slideshow</span>.</div>
              </>
            )}
            {tourStep === 1 && (
              <>
                <Eye className="h-8 w-8 text-blue-500 mb-2" />
                <div className="font-bold text-lg">Generate with one click</div>
                <div className="text-sm text-neutral-600">Hit <span className="font-semibold">Generate</span> to let Scrollie work its magic.</div>
              </>
            )}
            {tourStep === 2 && (
              <>
                <Download className="h-8 w-8 text-green-500 mb-2" />
                <div className="font-bold text-lg">Preview & Export</div>
                <div className="text-sm text-neutral-600">See your content and export it instantly.</div>
              </>
            )}
            <Button className="mt-4 w-full" onClick={handleNextTour}>
              {tourStep < 2 ? "Next" : "Got it!"}
            </Button>
          </div>
        </div>
      )}
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-tight text-black">Content Creator Hub</h1>
        <div className="flex space-x-3">
          <Link href="/dashboard/create/slideshow">
            <Button className="rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-neutral-800">
              <Plus className="mr-2 h-4 w-4" />
              Create Slideshow
            </Button>
          </Link>
          <Link href="/dashboard/create/carousel">
            <Button
              variant="outline"
              className="rounded-full border-neutral-200 px-4 text-sm font-medium text-black hover:bg-neutral-50 bg-transparent"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Carousel
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-neutral-100 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Slideshow Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-medium text-black">
                {user.usage.slideshows} / {user.limits.slideshows}
              </div>
              <div className="text-sm text-neutral-500">
                {user.plan === "premium" ? "Unlimited" : `${user.limits.slideshows - user.usage.slideshows} remaining`}
              </div>
            </div>
            <Progress
              value={(user.usage.slideshows / user.limits.slideshows) * 100}
              className="mt-2 h-1 bg-neutral-100"
            />
          </CardContent>
        </Card>

        <Card className="border-neutral-100 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Carousel Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-medium text-black">
                {user.usage.carousels} / {user.limits.carousels}
              </div>
              <div className="text-sm text-neutral-500">
                {user.plan === "premium" ? "Unlimited" : `${user.limits.carousels - user.usage.carousels} remaining`}
              </div>
            </div>
            <Progress
              value={(user.usage.carousels / user.limits.carousels) * 100}
              className="mt-2 h-1 bg-neutral-100"
            />
          </CardContent>
        </Card>

        <Card className="border-neutral-100 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-black">
              {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
            </div>
            {user.plan === "free" && (
              <Link href="/dashboard/settings">
                <Button variant="link" className="mt-2 h-auto p-0 text-black hover:text-neutral-700">
                  Upgrade your plan
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-6 text-xl font-medium tracking-tight text-black">Recent Projects</h2>

      {recentProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map((project) => (
            <Card
              key={project.id}
              className="border-neutral-100 shadow-none transition-all hover:border-neutral-200 hover:shadow-sm"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {project.type === "slideshow" ? (
                      <Presentation className="mr-2 h-5 w-5 text-neutral-400" />
                    ) : (
                      <ImageIcon className="mr-2 h-5 w-5 text-neutral-400" />
                    )}
                    <CardTitle className="text-base font-medium text-black">{project.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="flex items-center text-xs text-neutral-500">
                  <Clock className="mr-1 h-3 w-3" />
                  Updated {formatDate(project.updatedAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">
                  {project.type === "slideshow" ? `${project.slides} slides` : `${project.images} images`}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-neutral-100 pt-4">
                <Link href={`/dashboard/edit/${project.type}/${project.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    Edit
                  </Button>
                </Link>
                <Link href={`/dashboard/preview/${project.type}/${project.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-neutral-200 text-sm font-medium text-black hover:bg-neutral-50 bg-transparent"
                  >
                    Preview
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-neutral-100 shadow-none">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-neutral-100 p-3">
              <Presentation className="h-6 w-6 text-neutral-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-black">No projects yet</h3>
            <p className="mb-6 max-w-md text-sm text-neutral-600">
              Welcome to Scrollie! Create your first carousel or slideshow and watch your content go viral 🚀
            </p>
            <div className="flex space-x-3">
              <Link href="/dashboard/create/slideshow">
                <Button className="rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-neutral-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Slideshow
                </Button>
              </Link>
              <Link href="/dashboard/create/carousel">
                <Button
                  variant="outline"
                  className="rounded-full border-neutral-200 px-4 text-sm font-medium text-black hover:bg-neutral-50 bg-transparent"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Carousel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
