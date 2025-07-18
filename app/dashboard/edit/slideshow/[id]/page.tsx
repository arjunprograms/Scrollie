"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Save, Download, Trash2, Plus, ChevronUp, ChevronDown, FileText, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface Slide {
  title: string
  content: string[]
}

interface Project {
  id: string
  title: string
  type: string
  description: string
  template: string
  slides: Slide[]
  createdAt: string
  updatedAt: string
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

export default function EditSlideshow() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [project, setProject] = useState<Project | null>(null)
  const [slides, setSlides] = useState<Slide[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  useEffect(() => {
    setIsMounted(true)
    const id = params.id as string

    // Load project from localStorage
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
      const projects = JSON.parse(storedProjects)
      const foundProject = projects.find((p: Project) => p.id === id)

      if (foundProject) {
        setProject(foundProject)
        setSlides(foundProject.slides)

        form.reset({
          title: foundProject.title,
          description: foundProject.description,
        })
      } else {
        toast({
          title: "Project not found",
          description: "The requested slideshow could not be found.",
          variant: "destructive",
        })
        router.push("/dashboard")
      }
    }
  }, [params.id, router, toast, form])

  const handleSave = async (values: z.infer<typeof formSchema>) => {
    if (!project) return

    setIsSaving(true)

    try {
      const updatedProject = {
        ...project,
        title: values.title,
        description: values.description,
        slides: slides,
        updatedAt: new Date().toISOString(),
      }

      // Update in localStorage
      const storedProjects = localStorage.getItem("projects")
      if (storedProjects) {
        const projects = JSON.parse(storedProjects)
        const updatedProjects = projects.map((p: Project) => (p.id === project.id ? updatedProject : p))
        localStorage.setItem("projects", JSON.stringify(updatedProjects))
      }

      setProject(updatedProject)

      toast({
        title: "Saved",
        description: "Your slideshow has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving slideshow:", error)
      toast({
        title: "Error",
        description: "Failed to save slideshow. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleExport = (format: "pdf" | "pptx") => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Export complete",
        description: `Your slideshow has been exported as ${format.toUpperCase()}.`,
      })
    }, 2000)
  }

  const handleDeleteProject = () => {
    if (!project) return

    // Remove from localStorage
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
      const projects = JSON.parse(storedProjects)
      const updatedProjects = projects.filter((p: Project) => p.id !== project.id)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
    }

    toast({
      title: "Deleted",
      description: "Your slideshow has been deleted.",
    })

    router.push("/dashboard")
  }

  const addSlide = () => {
    const newSlide: Slide = {
      title: "New Slide",
      content: ["Add your content here"],
    }
    setSlides([...slides, newSlide])
  }

  const updateSlide = (index: number, updatedSlide: Slide) => {
    const newSlides = [...slides]
    newSlides[index] = updatedSlide
    setSlides(newSlides)
  }

  const deleteSlide = (index: number) => {
    const newSlides = [...slides]
    newSlides.splice(index, 1)
    setSlides(newSlides)
  }

  const moveSlide = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === slides.length - 1)) {
      return
    }

    const newSlides = [...slides]
    const newIndex = direction === "up" ? index - 1 : index + 1

    // Swap slides
    const temp = newSlides[index]
    newSlides[index] = newSlides[newIndex]
    newSlides[newIndex] = temp

    setSlides(newSlides)
  }

  const updateSlideContent = (slideIndex: number, contentIndex: number, value: string) => {
    const newSlides = [...slides]
    newSlides[slideIndex].content[contentIndex] = value
    setSlides(newSlides)
  }

  const addContentItem = (slideIndex: number) => {
    const newSlides = [...slides]
    newSlides[slideIndex].content.push("New bullet point")
    setSlides(newSlides)
  }

  const deleteContentItem = (slideIndex: number, contentIndex: number) => {
    const newSlides = [...slides]
    newSlides[slideIndex].content.splice(contentIndex, 1)
    setSlides(newSlides)
  }

  if (!isMounted || !project) {
    return null
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Slideshow</h1>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={form.handleSubmit(handleSave)} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={isExporting}>
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? "Exporting..." : "Export"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pptx")}>
                <FileImage className="mr-2 h-4 w-4" />
                Export as PowerPoint
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Slideshow</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this slideshow? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteProject}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="sticky top-6">
            <Card>
              <CardHeader>
                <CardTitle>Slideshow Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={form.handleSubmit(handleSave)} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="mb-4 flex justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Slides ({slides.length})</h2>
            <Button onClick={addSlide}>
              <Plus className="mr-2 h-4 w-4" />
              Add Slide
            </Button>
          </div>

          <div className="space-y-6">
            {slides.map((slide, slideIndex) => (
              <Card key={slideIndex}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Input
                      value={slide.title}
                      onChange={(e) =>
                        updateSlide(slideIndex, {
                          ...slide,
                          title: e.target.value,
                        })
                      }
                      className="text-lg font-semibold"
                      placeholder="Slide Title"
                    />
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveSlide(slideIndex, "up")}
                        disabled={slideIndex === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveSlide(slideIndex, "down")}
                        disabled={slideIndex === slides.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSlide(slideIndex)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {slide.content.map((content, contentIndex) => (
                      <div key={contentIndex} className="flex items-start space-x-2">
                        <Textarea
                          value={content}
                          onChange={(e) => updateSlideContent(slideIndex, contentIndex, e.target.value)}
                          className="min-h-[60px] flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteContentItem(slideIndex, contentIndex)}
                          disabled={slide.content.length <= 1}
                          className="mt-3 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" onClick={() => addContentItem(slideIndex)}>
                    <Plus className="mr-2 h-3 w-3" />
                    Add Bullet Point
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {slides.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <p className="mb-4 text-gray-500">No slides yet</p>
                <Button onClick={addSlide}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Slide
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
