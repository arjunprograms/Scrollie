"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

const Register = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      router.push("/dashboard")
    }
  }, [router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Simulate API call for registration
      const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

      // Check if email already exists
      if (storedUsers.some((u: any) => u.email === values.email)) {
        toast({
          title: "Email already registered",
          description: "Try logging in or use a different email.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const newUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: values.name,
        email: values.email,
        password: values.password, // In a real app, never store plain passwords!
        plan: "free",
        usage: {
          slideshows: 0,
          carousels: 0,
        },
        limits: {
          slideshows: 5,
          carousels: 10,
        },
      }

      localStorage.setItem("registeredUsers", JSON.stringify([...storedUsers, newUser]))

      toast({
        title: "Welcome to Scrollie!",
        description: "Your content journey starts now.",
      })
      router.push("/login")
    } catch (error) {
      console.error("Unexpected error during registration:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Create your Scrollie account</h2>
        {/* Social sign-up placeholder */}
        <div className="mb-6 flex flex-col gap-3">
          <button className="w-full flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-700 shadow hover:bg-neutral-50 transition">
            <img src="/google.svg" alt="Google" className="h-5 w-5" /> Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-700 shadow hover:bg-neutral-50 transition">
            <img src="/twitter.svg" alt="Twitter" className="h-5 w-5" /> Sign up with Twitter
          </button>
        </div>
        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-neutral-200" />
          <span className="mx-4 text-xs text-neutral-400">or</span>
          <div className="flex-grow border-t border-neutral-200" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-xs text-neutral-400">We respect your privacy. No spam, ever.</p>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
