"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

export default function Settings() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false)
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

  const handleUpgrade = (plan: string) => {
    setSelectedPlan(plan)
    setUpgradeDialogOpen(true)
  }

  const confirmUpgrade = () => {
    if (!user || !selectedPlan) return

    setIsUpgrading(true)

    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        ...user,
        plan: selectedPlan,
        limits:
          selectedPlan === "pro"
            ? { slideshows: 20, carousels: 30 }
            : selectedPlan === "premium"
              ? { slideshows: 999, carousels: 999 }
              : { slideshows: 5, carousels: 10 }, // Free plan limits
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      setIsUpgrading(false)
      setUpgradeDialogOpen(false)

      toast({
        title: "Plan updated",
        description: `You have successfully changed to the ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan.`,
      })
    }, 2000)
  }

  if (!isMounted || !user) {
    return null
  }

  return (
    <div>
      <h1 className="mb-10 text-2xl font-medium tracking-tight text-black">Settings</h1>

      <div className="mb-12">
        <h2 className="mb-6 text-xl font-medium tracking-tight text-black">Account Information</h2>
        <Card className="border-neutral-100 shadow-none">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-neutral-500">Name</p>
                <p className="text-black">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">Email</p>
                <p className="text-black">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">Current Plan</p>
                <p className="text-black">{user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-6 text-xl font-medium tracking-tight text-black">Subscription Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className={`border-neutral-100 shadow-none ${user.plan === "free" ? "border-2 border-black" : ""}`}>
            <CardHeader>
              <CardTitle className="text-xl font-medium text-black">Free</CardTitle>
              <CardDescription className="text-neutral-600">$0/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-neutral-600">
                <li className="flex items-center">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></div>5 slideshows per month
                </li>
                <li className="flex items-center">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></div>10 carousels per month
                </li>
                <li className="flex items-center">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></div>Basic templates
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {user.plan === "free" ? (
                <Button
                  className="w-full rounded-full border-neutral-200 text-sm font-medium text-neutral-400 bg-transparent"
                  variant="outline"
                  disabled
                >
                  Current Plan
                </Button>
              ) : (
                <Button
                  className="w-full rounded-full border-neutral-200 text-sm font-medium text-black hover:bg-neutral-50 bg-transparent"
                  variant="outline"
                  onClick={() => handleUpgrade("free")}
                >
                  Downgrade
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card className={`border-neutral-100 shadow-none ${user.plan === "pro" ? "border-2 border-black" : ""}`}>
            <CardHeader>
              <CardTitle className="text-xl font-medium text-black">Pro</CardTitle>
              <CardDescription className="text-neutral-600">$19/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-neutral-600">
                <li className="flex items-center">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></div>20 slideshows per month
                </li>
                <li className="flex items-center">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></div>30 carousels per month
                </li>
                <li className="flex items-center">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></div>Premium templates
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {user.plan === "pro" ? (
                <Button
                  className="w-full rounded-full border-neutral-200 text-sm font-medium text-neutral-400 bg-transparent"
                  variant="outline"
                  disabled
                >
                  Current Plan
                </Button>
              ) : (
                <Button
                  className="w-full rounded-full bg-black text-sm font-medium text-white hover:bg-neutral-800"
                  onClick={() => handleUpgrade("pro")}
                >
                  {user.plan === "premium" ? "Downgrade" : "Upgrade"}
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card className={`border-neutral-100 shadow-none ${user.plan === "premium" ? "border-2 border-black" : ""}`}>
            <CardHeader>
              <CardTitle className="text-xl font-medium text-black">Premium</CardTitle>
              <CardDescription className="text-neutral-600">$39/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-neutral-600">
                <li className="flex items-center">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></div>Unlimited slideshows
                </li>
                <li className="flex items-center">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></div>Unlimited carousels
                </li>
                <li className="flex items-center">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></div>All templates
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {user.plan === "premium" ? (
                <Button
                  className="w-full rounded-full border-neutral-200 text-sm font-medium text-neutral-400 bg-transparent"
                  variant="outline"
                  disabled
                >
                  Current Plan
                </Button>
              ) : (
                <Button
                  className="w-full rounded-full bg-black text-sm font-medium text-white hover:bg-neutral-800"
                  onClick={() => handleUpgrade("premium")}
                >
                  Upgrade
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>

      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent className="rounded-lg border-neutral-100 p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium tracking-tight text-black">
              {selectedPlan === "free"
                ? "Downgrade to Free Plan"
                : `Upgrade to ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan`}
            </DialogTitle>
            <DialogDescription className="text-neutral-600">
              {selectedPlan === "free"
                ? "Are you sure you want to downgrade to the Free plan? You will lose access to premium features."
                : `You are about to upgrade to the ${
                    selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)
                  } plan. Your card will be charged ${selectedPlan === "pro" ? "$19" : "$39"} monthly.`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md border border-neutral-200 p-4">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-neutral-500" />
                <div>
                  <p className="text-sm font-medium text-black">Credit Card ending in 4242</p>
                  <p className="text-xs text-neutral-500">Expires 12/2025</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUpgradeDialogOpen(false)}
              className="rounded-full border-neutral-200 text-sm font-medium text-black hover:bg-neutral-50"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmUpgrade}
              disabled={isUpgrading}
              className="rounded-full bg-black text-sm font-medium text-white hover:bg-neutral-800"
            >
              {isUpgrading ? (
                "Processing..."
              ) : (
                <>
                  Confirm
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
