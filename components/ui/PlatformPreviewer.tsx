import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

const PLATFORMS = ["Instagram", "LinkedIn", "X"] as const

type Platform = typeof PLATFORMS[number]

type CarouselImage = {
  title: string
  caption: string
}

type ExportFormat = "PNG" | "PDF" | "PPTX"

interface PlatformPreviewerProps {
  images: CarouselImage[]
  initialPlatform?: Platform
  template?: string // e.g., 'Viral Tips', 'Story', etc.
  videoDemoUrl?: string // optional, for video processing demo
}

const PLATFORM_CALLOUTS: Record<Platform, string> = {
  Instagram: 'Visuals optimized for high engagement on Instagram.',
  LinkedIn: 'Professional tone adjusted for LinkedIn engagement.',
  X: 'Concise thread format with platform-specific hashtags.',
}

const TEMPLATE_INTELLIGENCE: Record<string, Partial<Record<Platform, string>>> = {
  'Viral Tips': {
    Instagram: 'Uses bold visuals and swipe prompts.',
    LinkedIn: 'Highlights actionable insights for professionals.',
    X: 'Threads tips with trending hashtags.',
  },
  'Story': {
    Instagram: 'Story format with engaging visuals.',
    LinkedIn: 'Narrative adapted for business context.',
    X: 'Short, punchy story thread.',
  },
  // Add more templates as needed
}

export default function PlatformPreviewer({ images, initialPlatform = "Instagram", template, videoDemoUrl }: PlatformPreviewerProps) {
  const [platform, setPlatform] = useState<Platform>(initialPlatform)
  const [showExport, setShowExport] = useState(false)
  const [exporting, setExporting] = useState<ExportFormat | null>(null)
  const [tooltipSeen, setTooltipSeen] = useState<{ [k: string]: boolean }>({})
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleExport = (format: ExportFormat) => {
    setExporting(format)
    setTimeout(() => {
      setExporting(null)
      setShowExport(false)
    }, 1200)
  }

  const handleTooltip = (key: string) => {
    if (!tooltipSeen[key]) {
      setTooltipSeen((prev) => ({ ...prev, [key]: true }))
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current)
      tooltipTimeout.current = setTimeout(() => {
        setTooltipSeen((prev) => ({ ...prev, [key]: false }))
      }, 2200)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Platform Switcher */}
      <div className="mb-4 flex justify-center gap-4">
        {PLATFORMS.map((p) => (
          <motion.button
            key={p}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-150 focus:outline-none ${platform === p ? 'bg-purple-600 text-white shadow-lg scale-105' : 'text-purple-400 hover:bg-purple-100/10 hover:scale-105'}`}
            style={{ minWidth: 110, minHeight: 36 }}
            onClick={() => { setPlatform(p); handleTooltip(p) }}
            whileTap={{ scale: 0.97 }}
            layout
          >
            {p}
            <AnimatePresence>
              {!tooltipSeen[p] && (
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="ml-2 text-xs text-purple-200"
                >
                  {/* Show tooltip on first click */}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip open={!tooltipSeen[p]}>
                      <TooltipTrigger asChild>
                        <span></span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-purple-700 text-white px-2 py-1 rounded shadow">
                        {`See ${p} version`}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      {/* Platform Callout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={platform + '-callout'}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-2 flex justify-center"
        >
          <span className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 text-xs font-semibold text-white shadow animate-fade-in">
            {PLATFORM_CALLOUTS[platform]}
          </span>
        </motion.div>
      </AnimatePresence>
      {/* Template Intelligence Callout */}
      {template && TEMPLATE_INTELLIGENCE[template] && TEMPLATE_INTELLIGENCE[template][platform] && (
        <div className="mb-2 flex justify-center">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-200 shadow-sm">
            {TEMPLATE_INTELLIGENCE[template][platform]}
          </span>
        </div>
      )}
      {/* Video Processing Demo Callout */}
      {videoDemoUrl && (
        <div className="mb-4 flex flex-col items-center">
          <video src={videoDemoUrl} controls className="rounded-xl w-full max-w-md mb-2 shadow-lg" />
          <span className="text-xs text-blue-400 font-medium">Intelligent cropping keeps subjects in frame for each platform.</span>
        </div>
      )}
      {/* Preview Slides */}
      <motion.div
        key={platform}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4 items-center"
        layout
      >
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className="w-full max-w-xl rounded-lg bg-white/20 p-4 shadow-md group transition-all duration-150 hover:shadow-xl hover:bg-white/30 cursor-pointer"
            whileHover={{ scale: 1.015 }}
            layout
          >
            <div className="font-bold text-lg text-purple-300 mb-1 flex items-center">
              {img.title || `Slide ${idx + 1}`}
              <TooltipProvider delayDuration={0}>
                <Tooltip open={!tooltipSeen[`slide-${idx}`]}>
                  <TooltipTrigger asChild>
                    <span className="ml-2 text-xs text-purple-200" onMouseEnter={() => handleTooltip(`slide-${idx}`)}></span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-purple-700 text-white px-2 py-1 rounded shadow">
                    {`Click to edit`} {/* Example tooltip */}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-white text-base">{img.caption}</div>
            <div className="mt-2 text-xs text-neutral-300">{platform} preview</div>
          </motion.div>
        ))}
      </motion.div>
      {/* Magic Export Panel */}
      <div className="mt-8 flex flex-col items-center">
        <motion.button
          className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-lg mb-2"
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowExport((v) => !v)}
          layout
        >
          Magic Export
        </motion.button>
        <AnimatePresence>
          {showExport && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="flex gap-4 mt-2"
              layout
            >
              {["PNG", "PDF", "PPTX"].map((fmt) => (
                <motion.button
                  key={fmt}
                  className={`px-5 py-2 rounded-lg font-semibold text-sm bg-white/20 text-purple-600 hover:bg-purple-100/20 shadow transition-all duration-150 focus:outline-none ${exporting === fmt ? 'opacity-60 pointer-events-none' : ''}`}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleExport(fmt as ExportFormat)}
                  layout
                >
                  {exporting === fmt ? (
                    <span className="flex items-center gap-2"><span className="inline-block h-4 w-4 border-2 border-t-2 border-t-white border-purple-400 rounded-full animate-spin" /> Exporting...</span>
                  ) : (
                    <>{fmt}</>) }
                  <TooltipProvider delayDuration={0}>
                    <Tooltip open={!tooltipSeen[`export-${fmt}`]}>
                      <TooltipTrigger asChild>
                        <span className="ml-1 text-xs text-purple-300" onMouseEnter={() => handleTooltip(`export-${fmt}`)}></span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-purple-700 text-white px-2 py-1 rounded shadow">
                        {`Export as ${fmt}`}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 