"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Save, Download, Trash2, Plus, ChevronUp, ChevronDown, FileImage } from "lucide-react"
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
import { useToast } from "@/components/ui/use-toast"
import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CarouselImage {
  title: string
  caption: string
}

interface Project {
  id: string
  title: string
  type: string
  description: string
  template: string
  images: CarouselImage[]
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

export default function EditCarousel() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [project, setProject] = useState<Project | null>(null)
  const [images, setImages] = useState<CarouselImage[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [showReferral, setShowReferral] = useState(false)
  const [hasShared, setHasShared] = useState(false)
  const [shareThanks, setShareThanks] = useState(false)
  const shareCaption = `Check out my new carousel! #MadeWithScrollie https://scrollie.ai`

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
        setImages(foundProject.images)

        form.reset({
          title: foundProject.title,
          description: foundProject.description,
        })
      } else {
        toast({
          title: "Project not found",
          description: "The requested carousel could not be found.",
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
        images: images,
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
        description: "Your carousel has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving carousel:", error)
      toast({
        title: "Error",
        description: "Failed to save carousel. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleExport = () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Export complete",
        description: "Your carousel images have been exported.",
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
      description: "Your carousel has been deleted.",
    })

    router.push("/dashboard")
  }

  const addImage = () => {
    const newImage: CarouselImage = {
      title: "New Image",
      caption: "Add your caption here",
    }
    setImages([...images, newImage])
  }

  const updateImage = (index: number, updatedImage: CarouselImage) => {
    const newImages = [...images]
    newImages[index] = updatedImage
    setImages(newImages)
  }

  const deleteImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const moveImage = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === images.length - 1)) {
      return
    }

    const newImages = [...images]
    const newIndex = direction === "up" ? index - 1 : index + 1

    // Swap images
    const temp = newImages[index]
    newImages[index] = newImages[newIndex]
    newImages[newIndex] = temp

    setImages(newImages)
  }

  const handleShare = (platform: 'Instagram' | 'LinkedIn' | 'X') => {
    setHasShared(true)
    setTimeout(() => setShareThanks(true), 1200)
    let url = ''
    if (navigator.share) {
      navigator.share({
        title: 'My Carousel on Scrollie',
        text: shareCaption,
        url: 'https://scrollie.ai',
      })
      return
    }
    if (platform === 'Instagram') {
      url = `https://www.instagram.com/?text=${encodeURIComponent(shareCaption)}`
    } else if (platform === 'LinkedIn') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://scrollie.ai')}&summary=${encodeURIComponent(shareCaption)}`
    } else if (platform === 'X') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareCaption)}`
    }
    window.open(url, '_blank')
    setShowReferral(true)
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Carousel</h1>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={form.handleSubmit(handleSave)} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button variant="outline" onClick={handleExport} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? "Exporting..." : "Export Images"}
          </Button>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Carousel</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this carousel? This action cannot be undone.
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
                <CardTitle>Carousel Details</CardTitle>
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
            <h2 className="text-xl font-semibold text-gray-900">Images ({images.length})</h2>
            <Button onClick={addImage}>
              <Plus className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </div>

          <div className="space-y-6">
            {images.map((image, imageIndex) => (
              <Card key={imageIndex}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Input
                      value={image.title}
                      onChange={(e) =>
                        updateImage(imageIndex, {
                          ...image,
                          title: e.target.value,
                        })
                      }
                      className="text-lg font-semibold"
                      placeholder="Image Title"
                    />
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveImage(imageIndex, "up")}
                        disabled={imageIndex === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveImage(imageIndex, "down")}
                        disabled={imageIndex === images.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteImage(imageIndex)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video rounded-md bg-gray-100 flex items-center justify-center">
                    <FileImage className="h-12 w-12 text-gray-400" />
                  </div>
                  <Textarea
                    value={image.caption}
                    onChange={(e) =>
                      updateImage(imageIndex, {
                        ...image,
                        caption: e.target.value,
                      })
                    }
                    placeholder="Image caption"
                    className="min-h-[80px]"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {images.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <p className="mb-4 text-gray-500">No images yet</p>
                <Button onClick={addImage}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Image
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Share Buttons after export */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:from-pink-600 hover:to-purple-700" onClick={() => handleShare('Instagram')}>
                <img src="/instagram.svg" alt="Instagram" className="h-5 w-5 mr-2" /> Share to Instagram
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold shadow-lg hover:from-blue-600 hover:to-blue-800" onClick={() => handleShare('LinkedIn')}>
                <img src="/linkedin.svg" alt="LinkedIn" className="h-5 w-5 mr-2" /> Share to LinkedIn
              </Button>
              <Button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold shadow-lg hover:from-gray-700 hover:to-gray-900" onClick={() => handleShare('X')}>
                <img src="/x.svg" alt="X" className="h-5 w-5 mr-2" /> Share to X
              </Button>
            </div>
            <AnimatePresence>
              {showReferral && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4 rounded-xl bg-white/90 p-4 shadow-lg border border-purple-200 flex flex-col items-center"
                >
                  <div className="font-bold text-purple-700 mb-1">Join the Scrollie Creator Partnership!</div>
                  <div className="text-sm text-neutral-700 mb-2">Get <span className="font-bold">10 extra carousel credits</span> for every friend who signs up using your referral link.</div>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-2 rounded-full" onClick={() => setShowReferral(false)}>
                    Get My Referral Link
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {shareThanks && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-2 text-green-600 font-semibold text-sm"
                >
                  🎉 Thanks for sharing with #MadeWithScrollie! We'll highlight top creators in-app soon.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
