"use client"

import { useState, useEffect, useRef } from "react"
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
import { motion, AnimatePresence } from "framer-motion"

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
  imageCount: z.string(),
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
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [preview, setPreview] = useState<null | { images: any[] }>(null)
  const [platform, setPlatform] = useState<'Instagram' | 'LinkedIn' | 'X'>('Instagram')
  const promptInputRef = useRef<HTMLTextAreaElement | null>(null)
  const [genStart, setGenStart] = useState<number | null>(null)
  const [genTime, setGenTime] = useState<number | null>(null)
  const [genStep, setGenStep] = useState(0)

  useEffect(() => {
    setIsMounted(true)
    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(storedUser))
    // Focus prompt input on mount
    setTimeout(() => { promptInputRef.current?.focus() }, 200)
  }, [router])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isGenerating && genStart) {
      interval = setInterval(() => {
        setGenTime(Date.now() - genStart)
      }, 100)
    } else if (!isGenerating && genStart && genTime === null) {
      setGenTime(Date.now() - genStart)
    }
    return () => { if (interval) clearInterval(interval) }
  }, [isGenerating, genStart])

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
    setPreview(null)
    setGenStart(Date.now())
    setGenTime(null)
    setGenStep(0)
    try {
      // Animate steps during generation
      const steps = [
        "Analyzing your idea…",
        "Crafting your LinkedIn carousel…",
        "Adding voiceover…",
        "Finalizing design…"
      ]
      let stepIdx = 0
      const stepInterval = setInterval(() => {
        setGenStep((prev) => {
          if (prev < steps.length - 1) return prev + 1
          return prev
        })
      }, 900)
      // Generate content with AI
      const prompt = `Create a social media carousel titled "${values.title}" based on this description: "${values.description}". \nGenerate content for ${values.imageCount} images. For each image, provide a title and a short caption or description.\nFormat the response as a JSON array of image objects, each with a "title" and "caption" property.`
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })
      clearInterval(stepInterval)
      setGenStep(steps.length - 1)
      let carouselContent
      try {
        carouselContent = JSON.parse(text)
      } catch (e) {
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

      // Instead of redirect, show preview
      setPreview({ images: carouselContent })
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
            {/* Main Prompt Input */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's your idea?</FormLabel>
                  <FormControl>
                    <Textarea
                      ref={promptInputRef}
                      placeholder="Describe your carousel idea or paste your content..."
                      className="min-h-32 text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    One click is all it takes. Just describe your idea and let AI do the rest.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Advanced Options Toggle */}
            <div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline focus:outline-none"
                onClick={() => setShowAdvanced((v) => !v)}
              >
                {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
              </button>
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-4"
                  >
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
                    <div className="grid gap-6 md:grid-cols-2 mt-4">
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Generate Button & Animated Loader */}
            <motion.button
              type="submit"
              className="w-full py-5 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg rounded-md flex items-center justify-center"
              disabled={isGenerating}
              whileTap={{ scale: 0.97 }}
              layout
            >
              {isGenerating ? (
                <motion.span
                  className="flex flex-col items-center w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="flex items-center gap-2 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="inline-block h-6 w-6 border-2 border-t-2 border-t-white border-purple-400 rounded-full animate-spin"
                      style={{ borderTopColor: '#fff', borderRightColor: '#a78bfa', borderBottomColor: '#a78bfa', borderLeftColor: '#a78bfa' }}
                    />
                    <span className="text-base font-semibold text-purple-200">
                      {['Analyzing your idea…','Crafting your LinkedIn carousel…','Adding voiceover…','Finalizing design…'][genStep]}
                    </span>
                  </motion.div>
                  <motion.div
                    className="w-full h-2 bg-purple-100 rounded-full overflow-hidden mb-2"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                  >
                    <motion.div
                      className="h-2 bg-gradient-to-r from-purple-400 to-pink-400"
                      style={{ width: `${((genTime || 0) % 3000) / 30}%` }}
                    />
                  </motion.div>
                  <span className="text-xs text-neutral-400">{genTime !== null ? `Elapsed: ${(genTime / 1000).toFixed(1)}s` : ''}</span>
                </motion.span>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Carousel
                </>
              )}
            </motion.button>
          </form>
        </Form>
        {/* Real-time Preview with Platform Switcher */}
        <AnimatePresence>
          {preview && !isGenerating && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.25 }}
              className="mt-10 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-400 shadow-lg p-6"
            >
              {/* Visual Timer Badge */}
              {genTime !== null && (
                <div className="mb-4 flex justify-center">
                  <span className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 text-xs font-bold text-white shadow-lg animate-fade-in">
                    Generated in {(genTime / 1000).toFixed(1)} seconds!
                  </span>
                </div>
              )}
              <div className="mb-4 flex justify-center gap-4">
                {['Instagram', 'LinkedIn', 'X'].map((p) => (
                  <button
                    key={p}
                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-150 ${platform === p ? 'bg-purple-600 text-white shadow' : 'text-purple-400 hover:bg-purple-100/10'}`}
                    style={{ minWidth: 110, minHeight: 36 }}
                    onClick={() => setPlatform(p as typeof platform)}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <motion.div
                key={platform}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
                className="flex flex-col gap-4 items-center"
              >
                {preview.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.4 }}
                    className="w-full max-w-xl rounded-lg bg-white/20 p-4 shadow-md"
                  >
                    <div className="font-bold text-lg text-purple-300 mb-1">{img.title || `Slide ${idx + 1}`}</div>
                    <div className="text-white text-base">{img.caption}</div>
                    <div className="mt-2 text-xs text-neutral-300">{platform} preview</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
