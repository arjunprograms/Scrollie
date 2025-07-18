"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Download, Clock, Moon, Sun } from "lucide-react"
import StarsBackground from "@/components/stars-background" // Import the new component

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true) // Set default to true

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-neutral-950" : "bg-neutral-50"
      }`}
    >
      <header
        className={`border-b transition-colors duration-300 ${
          isDarkMode ? "border-neutral-800 bg-neutral-950" : "border-neutral-200 bg-neutral-50"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center">
            <h1
              className={`text-xl font-medium tracking-tight transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              ContentAI
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleDarkMode}
              className={`rounded-full p-2 transition-colors duration-300 ${
                isDarkMode
                  ? "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  : "text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              href="/login"
              className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-neutral-900"
              }`}
            >
              Log in
            </Link>
            <Link href="/register">
              <Button
                className={`rounded-full px-6 text-sm font-medium transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-white text-neutral-900 hover:bg-neutral-100"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-24 md:py-32 overflow-hidden">
          {" "}
          {/* Added relative and overflow-hidden */}
          {isDarkMode && <StarsBackground />} {/* Render StarsBackground only in dark mode */}
          <div className="mx-auto max-w-screen-xl px-4 text-center md:px-8 relative z-10">
            {" "}
            {/* Added relative z-10 */}
            <h2
              className={`mx-auto mb-6 max-w-3xl text-4xl font-medium tracking-tight transition-colors duration-300 md:text-5xl lg:text-6xl ${
                isDarkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              Create stunning content with AI
            </h2>
            <p
              className={`mx-auto mb-10 max-w-xl text-lg transition-colors duration-300 ${
                isDarkMode ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              Generate professional slideshows and carousels in seconds with our AI-powered platform.
            </p>
            <Link href="/register">
              <Button
                className={`rounded-full px-8 py-6 text-sm font-medium transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-white text-neutral-900 hover:bg-neutral-100"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* AI-Powered Carousel Generator Section - First Image */}
        <section
          className={`border-t py-24 transition-colors duration-300 ${
            isDarkMode ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <div className="flex flex-col justify-center">
                <h3
                  className={`mb-4 text-2xl font-medium tracking-tight transition-colors duration-300 md:text-3xl ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  AI-Powered Carousel Generator
                </h3>
                <p
                  className={`mb-6 text-lg transition-colors duration-300 ${
                    isDarkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  Effortlessly transform ideas into carousels. From topics to full articles, our AI handles the rest
                  with support for 100+ languages.
                </p>
                <ul
                  className={`space-y-4 text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  <li className="flex items-start">
                    <div
                      className={`mr-3 mt-2 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    <div>
                      <strong className={isDarkMode ? "text-white" : "text-neutral-900"}>
                        From Topic to Carousel:
                      </strong>{" "}
                      Just input your topic, and our AI handles the rest
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div
                      className={`mr-3 mt-2 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    <div>
                      <strong className={isDarkMode ? "text-white" : "text-neutral-900"}>
                        Convert Text to Carousel:
                      </strong>{" "}
                      Transform your text into engaging slides within seconds
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div
                      className={`mr-3 mt-2 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    <div>
                      <strong className={isDarkMode ? "text-white" : "text-neutral-900"}>
                        Convert Articles to Carousel:
                      </strong>{" "}
                      Turn full articles into visually appealing carousel slides
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div
                      className={`mr-3 mt-2 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    <div>
                      <strong className={isDarkMode ? "text-white" : "text-neutral-900"}>100+ Languages:</strong>{" "}
                      Generate carousels in over 100 languages to reach a global audience
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div
                  className={`rounded-2xl p-1 transition-colors duration-300 ${
                    isDarkMode ? "bg-neutral-800" : "bg-white"
                  }`}
                >
                  <Image
                    src="/images/carousel-features.png"
                    alt="AI-powered carousel generator interface with mobile preview"
                    width={600}
                    height={400}
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Editor Section - Second Image */}
        <section
          className={`border-t py-24 transition-colors duration-300 ${
            isDarkMode ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <div className="relative lg:order-1">
                <div
                  className={`rounded-2xl p-1 transition-colors duration-300 ${
                    isDarkMode ? "bg-neutral-800" : "bg-white"
                  }`}
                >
                  <Image
                    src="/images/content-editor.png"
                    alt="Content editor interface with real-time preview"
                    width={600}
                    height={400}
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center lg:order-2">
                <h3
                  className={`mb-4 text-2xl font-medium tracking-tight transition-colors duration-300 md:text-3xl ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  Intuitive Content Editor
                </h3>
                <p
                  className={`mb-6 text-lg transition-colors duration-300 ${
                    isDarkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  Edit with AI in just a click. Instantly add smart layouts, rich content, and translations. Generate
                  images and rework with AI while collaborating real-time with your team.
                </p>
                <ul
                  className={`space-y-3 text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    Smart layouts and rich content generation
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    Real-time collaboration with your team
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    AI-powered image generation and editing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Content Types Section - Third Image */}
        <section
          className={`border-t py-24 transition-colors duration-300 ${
            isDarkMode ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="text-center mb-16">
              <h3
                className={`mb-4 text-2xl font-medium tracking-tight transition-colors duration-300 md:text-3xl ${
                  isDarkMode ? "text-white" : "text-neutral-900"
                }`}
              >
                Create Any Type of Content
              </h3>
              <p
                className={`mx-auto max-w-2xl text-lg transition-colors duration-300 ${
                  isDarkMode ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                From presentations to social media, documents to websites - our platform handles it all with
                professional quality and lightning-fast speed.
              </p>
            </div>
            <div className="relative">
              <div
                className={`rounded-2xl p-1 transition-colors duration-300 ${
                  isDarkMode ? "bg-neutral-800" : "bg-white"
                }`}
              >
                <Image
                  src="/images/content-types.png"
                  alt="Various content types including presentations, social media, documents, and websites"
                  width={1200}
                  height={400}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Hero Showcase Section - Fourth Image */}
        <section
          className={`border-t py-24 transition-colors duration-300 ${
            isDarkMode ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="text-center mb-16">
              <h3
                className={`mb-4 text-3xl font-medium tracking-tight transition-colors duration-300 md:text-4xl ${
                  isDarkMode ? "text-white" : "text-neutral-900"
                }`}
              >
                How good ideas get into the universe
              </h3>
              <p
                className={`mx-auto max-w-2xl text-lg transition-colors duration-300 ${
                  isDarkMode ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                Transform your concepts into beautiful presentations, social media content, and more with our AI-powered
                creative platform.
              </p>
            </div>
            <div className="relative">
              <div
                className={`rounded-2xl p-1 transition-colors duration-300 ${
                  isDarkMode ? "bg-neutral-800" : "bg-white"
                }`}
              >
                <Image
                  src="/images/hero-showcase.png"
                  alt="Creative showcase of various content types and designs"
                  width={1200}
                  height={600}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className={`border-t py-24 transition-colors duration-300 ${
            isDarkMode ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <h3
              className={`mb-16 text-center text-2xl font-medium tracking-tight transition-colors duration-300 md:text-3xl ${
                isDarkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              Why choose ContentAI?
            </h3>
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col items-start">
                <div
                  className={`mb-6 rounded-full p-3 transition-colors duration-300 ${
                    isDarkMode ? "bg-neutral-800" : "bg-white"
                  }`}
                >
                  <Sparkles
                    className={`h-6 w-6 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-neutral-900"
                    }`}
                  />
                </div>
                <h4
                  className={`mb-3 text-xl font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  AI-Powered Generation
                </h4>
                <p className={`transition-colors duration-300 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                  Create professional content in seconds with our advanced AI technology. Just describe what you need.
                </p>
              </div>
              <div className="flex flex-col items-start">
                <div
                  className={`mb-6 rounded-full p-3 transition-colors duration-300 ${
                    isDarkMode ? "bg-neutral-800" : "bg-white"
                  }`}
                >
                  <Download
                    className={`h-6 w-6 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-neutral-900"
                    }`}
                  />
                </div>
                <h4
                  className={`mb-3 text-xl font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  Easy Export
                </h4>
                <p className={`transition-colors duration-300 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                  Export your creations as PDF or PowerPoint files with a single click. No design skills required.
                </p>
              </div>
              <div className="flex flex-col items-start">
                <div
                  className={`mb-6 rounded-full p-3 transition-colors duration-300 ${
                    isDarkMode ? "bg-neutral-800" : "bg-white"
                  }`}
                >
                  <Clock
                    className={`h-6 w-6 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-neutral-900"
                    }`}
                  />
                </div>
                <h4
                  className={`mb-3 text-xl font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  Save Time
                </h4>
                <p className={`transition-colors duration-300 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                  What used to take hours now takes minutes. Focus on your message, not on design details.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`border-t py-24 transition-colors duration-300 ${
            isDarkMode ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <h3
              className={`mb-16 text-center text-2xl font-medium tracking-tight transition-colors duration-300 md:text-3xl ${
                isDarkMode ? "text-white" : "text-neutral-900"
              }`}
            >
              Pricing Plans
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div
                className={`rounded-xl border p-8 transition-colors duration-300 ${
                  isDarkMode ? "border-neutral-700 bg-neutral-900" : "border-neutral-200 bg-white"
                }`}
              >
                <h4
                  className={`mb-2 text-xl font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  Free
                </h4>
                <p
                  className={`mb-6 text-4xl font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  $0
                </p>
                <ul
                  className={`mb-8 space-y-4 text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    5 slideshows per month
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    10 carousels per month
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    Basic templates
                  </li>
                </ul>
                <Link href="/register" className="block w-full">
                  <Button
                    variant="outline"
                    className={`w-full rounded-full text-sm font-medium transition-colors duration-300 ${
                      isDarkMode
                        ? "border-neutral-600 bg-transparent text-white hover:bg-neutral-800"
                        : "border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100"
                    }`}
                  >
                    Get started
                  </Button>
                </Link>
              </div>
              <div
                className={`rounded-xl border-2 p-8 transition-colors duration-300 ${
                  isDarkMode ? "border-white bg-neutral-900" : "border-neutral-900 bg-white"
                }`}
              >
                <div
                  className={`mb-4 -mt-12 w-fit rounded-full px-4 py-1 text-xs font-medium transition-colors duration-300 ${
                    isDarkMode ? "bg-white text-neutral-900" : "bg-neutral-900 text-white"
                  }`}
                >
                  Popular
                </div>
                <h4
                  className={`mb-2 text-xl font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  Pro
                </h4>
                <p
                  className={`mb-6 text-4xl font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  $19
                  <span
                    className={`text-base font-normal transition-colors duration-300 ${
                      isDarkMode ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    /month
                  </span>
                </p>
                <ul
                  className={`mb-8 space-y-4 text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    20 slideshows per month
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    30 carousels per month
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    Premium templates
                  </li>
                </ul>
                <Link href="/register?plan=pro" className="block w-full">
                  <Button
                    className={`w-full rounded-full text-sm font-medium transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-white text-neutral-900 hover:bg-neutral-100"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                    }`}
                  >
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>
              <div
                className={`rounded-xl border p-8 transition-colors duration-300 ${
                  isDarkMode ? "border-neutral-700 bg-neutral-900" : "border-neutral-200 bg-white"
                }`}
              >
                <h4
                  className={`mb-2 text-xl font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  Premium
                </h4>
                <p
                  className={`mb-6 text-4xl font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  $39
                  <span
                    className={`text-base font-normal transition-colors duration-300 ${
                      isDarkMode ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    /month
                  </span>
                </p>
                <ul
                  className={`mb-8 space-y-4 text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    Unlimited slideshows
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    Unlimited carousels
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`mr-3 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isDarkMode ? "bg-white" : "bg-neutral-900"
                      }`}
                    ></div>
                    All templates
                  </li>
                </ul>
                <Link href="/register?plan=premium" className="block w-full">
                  <Button
                    variant="outline"
                    className={`w-full rounded-full text-sm font-medium transition-colors duration-300 ${
                      isDarkMode
                        ? "border-neutral-600 bg-transparent text-white hover:bg-neutral-800"
                        : "border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100"
                    }`}
                  >
                    Upgrade to Premium
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`border-t py-12 transition-colors duration-300 ${
          isDarkMode ? "border-neutral-800" : "border-neutral-200"
        }`}
      >
        <div
          className={`mx-auto max-w-screen-xl px-4 text-center text-sm transition-colors duration-300 md:px-8 ${
            isDarkMode ? "text-neutral-500" : "text-neutral-500"
          }`}
        >
          <p>© 2025 ContentAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
