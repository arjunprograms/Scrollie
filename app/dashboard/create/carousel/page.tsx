"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  template: z.string({
    required_error: "Please select a template.",
  }),
  imageCount: z.string().transform((val) => Number.parseInt(val, 10)),
})

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

export default function CreateCarousel() {
  const router = useRouter()
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      template: "",
      imageCount: "5",
    },
  })

  const checkUsageLimits = () => {
    if (!user) return false

    if (user.usage.carousels >= user.limits.carousels) {
      toast({
        title: "Usage limit reached",
        description: `You've reached your ${user.plan} plan limit for carousels. Please upgrade your plan to create more.`,
        variant: "destructive",
      })
      return false
    }

    return true
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!checkUsageLimits()) return

    setIsGenerating(true)

    try {
      // Generate content with AI
      const prompt = `Create a social media carousel titled "${values.title}" based on this description: "${values.description}". 
      Generate content for ${values.imageCount} images. For each image, provide a title and a short caption or description.
      Format the response as a JSON array of image objects, each with a "title" and "caption" property.`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })

      let carouselContent
      try {
        carouselContent = JSON.parse(text)
      } catch (e) {
        // If parsing fails, create a simple structure
        carouselContent = [{ title: values.title, caption: values.description }]
      }

      // Create new project
      const newProject = {
        id: "proj-" + Math.random().toString(36).substr(2, 9),
        title: values.title,
        type: "carousel",
        description: values.description,
        template: values.template,
        images: carouselContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Save to localStorage
      const storedProjects = localStorage.getItem("projects")
      const projects = storedProjects ? JSON.parse(storedProjects) : []
      localStorage.setItem("projects", JSON.stringify([...projects, newProject]))

      // Update user usage in localStorage
      if (user) {
        const updatedUser = {
          ...user,
          usage: {
            ...user.usage,
            carousels: user.usage.carousels + 1,
          },
        }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser) // Update local state as well
      }

      toast({
        title: "Carousel created!",
        description: "Your carousel has been generated successfully.",
      })

      router.push(`/dashboard/edit/carousel/${newProject.id}`)
    } catch (error) {
      console.error("Error generating carousel:", error)
      toast({
        title: "Error",
        description: "Failed to generate carousel. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  if (!isMounted || !user) {
    return null
  }

  return (
    <div>
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Create Carousel</h1>
      </div>

      <div className="mx-auto max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Launch Campaign" {...field} />
                  </FormControl>
                  <FormDescription>The title of your social media carousel.</FormDescription>
                  <FormMessage />
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
                    <Textarea
                      placeholder="A carousel showcasing our new product features and benefits for the upcoming launch."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe what you want in your carousel. The more detailed, the better the AI can generate relevant
                    content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="colorful">Colorful</SelectItem>
                        <SelectItem value="elegant">Elegant</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose a design template for your carousel.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Images</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select image count" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="3">3 images</SelectItem>
                        <SelectItem value="5">5 images</SelectItem>
                        <SelectItem value="7">7 images</SelectItem>
                        <SelectItem value="10">10 images</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How many images do you want in your carousel?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Carousel...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Carousel
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
