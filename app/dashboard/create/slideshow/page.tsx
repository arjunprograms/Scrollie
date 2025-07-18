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
  slideCount: z.string().transform((val) => Number.parseInt(val, 10)),
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

export default function CreateSlideshow() {
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
      slideCount: "10",
    },
  })

  const checkUsageLimits = () => {
    if (!user) return false

    if (user.usage.slideshows >= user.limits.slideshows) {
      toast({
        title: "Usage limit reached",
        description: `You've reached your ${user.plan} plan limit for slideshows. Please upgrade your plan to create more.`,
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
      const prompt = `Create a professional slideshow presentation titled "${values.title}" based on this description: "${values.description}". 
      Generate content for ${values.slideCount} slides. For each slide, provide a title and bullet points or paragraphs of content.
      Format the response as a JSON array of slide objects, each with a "title" and "content" property. The content should be an array of strings, each representing a bullet point or paragraph.`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })

      let slidesContent
      try {
        slidesContent = JSON.parse(text)
      } catch (e) {
        // If parsing fails, create a simple structure
        slidesContent = [{ title: values.title, content: [values.description] }]
      }

      // Create new project
      const newProject = {
        id: "proj-" + Math.random().toString(36).substr(2, 9),
        title: values.title,
        type: "slideshow",
        description: values.description,
        template: values.template,
        slides: slidesContent,
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
            slideshows: user.usage.slideshows + 1,
          },
        }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser) // Update local state as well
      }

      toast({
        title: "Slideshow created",
        description: "Your slideshow has been generated successfully.",
      })

      router.push(`/dashboard/edit/slideshow/${newProject.id}`)
    } catch (error) {
      console.error("Error generating slideshow:", error)
      toast({
        title: "Error",
        description: "Failed to generate slideshow. Please try again.",
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
      <div className="mb-10 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="mr-2 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-medium tracking-tight text-black">Create Slideshow</h1>
      </div>

      <div className="mx-auto max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Q2 Marketing Strategy"
                      className="rounded-lg border-neutral-200 py-6 text-black focus-visible:ring-black"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-neutral-500">
                    The title of your slideshow presentation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A comprehensive overview of our Q2 marketing strategy, including goals, tactics, and KPIs."
                      className="min-h-32 rounded-lg border-neutral-200 text-black focus-visible:ring-black"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-neutral-500">
                    Describe what you want in your slideshow. The more detailed, the better the AI can generate relevant
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
                    <FormLabel className="text-sm font-medium text-neutral-700">Template</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg border-neutral-200 py-6 text-black focus-visible:ring-black">
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs text-neutral-500">
                      Choose a design template for your slideshow.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slideCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700">Number of Slides</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg border-neutral-200 py-6 text-black focus-visible:ring-black">
                          <SelectValue placeholder="Select slide count" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5 slides</SelectItem>
                        <SelectItem value="10">10 slides</SelectItem>
                        <SelectItem value="15">15 slides</SelectItem>
                        <SelectItem value="20">20 slides</SelectItem>
                        <SelectItem value="25">25 slides</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs text-neutral-500">
                      How many slides do you want in your presentation?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="mt-4 w-full rounded-full bg-black py-6 text-sm font-medium text-white hover:bg-neutral-800"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Slideshow...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Slideshow
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
