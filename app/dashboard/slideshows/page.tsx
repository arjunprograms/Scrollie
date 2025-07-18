"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Presentation, Plus, Search, Calendar, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface Project {
  id: string
  title: string
  type: string
  description: string
  createdAt: string
  updatedAt: string
}

export default function Slideshows() {
  const router = useRouter()
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Load projects from localStorage
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
      const allProjects = JSON.parse(storedProjects)
      const slideshowProjects = allProjects.filter((project: Project) => project.type === "slideshow")
      setProjects(slideshowProjects)
    }
  }, [])

  const handleDelete = (id: string) => {
    // Remove from localStorage
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
      const allProjects = JSON.parse(storedProjects)
      const updatedProjects = allProjects.filter((project: Project) => project.id !== id)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))

      // Update state
      const updatedSlideshows = projects.filter((project) => project.id !== id)
      setProjects(updatedSlideshows)

      toast({
        title: "Deleted",
        description: "Slideshow has been deleted.",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Slideshows</h1>
        <Link href="/dashboard/create/slideshow">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            New Slideshow
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search slideshows..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Presentation className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="font-medium">{project.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      {formatDate(project.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      {formatDate(project.updatedAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/edit/slideshow/${project.id}`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(project.id)} className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed py-12 text-center">
          <Presentation className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">No slideshows found</h3>
          <p className="mb-4 max-w-md text-sm text-gray-600">
            {searchQuery ? "No slideshows match your search criteria." : "You haven't created any slideshows yet."}
          </p>
          <Link href="/dashboard/create/slideshow">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Slideshow
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
