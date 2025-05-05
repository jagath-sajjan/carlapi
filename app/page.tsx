"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Code, FileText, Link2, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FeatureCard from "@/components/feature-card"
import ApiPlayground from "@/components/api-playground"

export default function Home() {
  const [url, setUrl] = useState("")

  const handleTryItOut = () => {
    if (url) {
      window.open(`/api/crawl?url=${encodeURIComponent(url)}`, "_blank")
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Your Web Presence with <span className="text-emerald-400">Carlapi</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
              A powerful API for crawling websites, generating sitemaps, and discovering backlinks - all with a simple
              API call.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex-1 max-w-xl">
              <Input
                type="url"
                placeholder="Enter a URL to crawl (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <Button onClick={handleTryItOut} className="h-12 px-8 bg-emerald-500 hover:bg-emerald-600 text-white">
              Try it now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* API Playground Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Interactive API Playground</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Test our API endpoints in real-time and see the results instantly
            </p>
          </div>

          <ApiPlayground />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to analyze and understand your web presence
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-emerald-500" />}
              title="Page Discovery"
              description="Automatically crawl and discover all pages on a domain, including their titles and status codes."
              variants={item}
            />
            <FeatureCard
              icon={<Link2 className="h-10 w-10 text-emerald-500" />}
              title="Backlink Analysis"
              description="Identify external websites linking to your domain to understand your site's authority."
              variants={item}
            />
            <FeatureCard
              icon={<Map className="h-10 w-10 text-emerald-500" />}
              title="Sitemap Generation"
              description="Automatically generate XML sitemaps for better search engine indexing and visibility."
              variants={item}
            />
            <FeatureCard
              icon={<Code className="h-10 w-10 text-emerald-500" />}
              title="Simple Integration"
              description="Easy-to-use RESTful API with comprehensive documentation and examples in multiple languages."
              variants={item}
            />
            <FeatureCard
              icon={
                <svg
                  className="h-10 w-10 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L9 12L15 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Redirect Tracking"
              description="Track and analyze all redirects on your website to ensure proper SEO and user experience."
              variants={item}
            />
            <FeatureCard
              icon={
                <svg
                  className="h-10 w-10 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="Performance Optimized"
              description="Built on Vercel's edge network for lightning-fast response times and global availability."
              variants={item}
            />
          </motion.div>
        </div>
      </section>

      {/* API Documentation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">API Documentation</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Simple, RESTful endpoints for all your web crawling needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div className="p-4 rounded-lg bg-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-2">GET /api/crawl</h3>
                    <p className="text-sm text-slate-700">Crawl a URL or domain to discover all pages</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-2">GET /api/sitemap</h3>
                    <p className="text-sm text-slate-700">Generate an XML sitemap for a domain</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-2">GET /api/backlinks</h3>
                    <p className="text-sm text-slate-700">Discover backlinks pointing to a domain</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-8">
              <Card>
                <CardContent className="pt-6">
                  <Tabs defaultValue="crawl">
                    <TabsList className="mb-4">
                      <TabsTrigger value="crawl">Crawl</TabsTrigger>
                      <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
                      <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="crawl">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">Parameters</h3>
                          <ul className="space-y-2">
                            <li className="flex">
                              <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 w-20 flex-shrink-0">
                                url
                              </span>
                              <span className="ml-4 text-slate-700">The URL or domain to crawl (required)</span>
                            </li>
                            <li className="flex">
                              <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 w-20 flex-shrink-0">
                                depth
                              </span>
                              <span className="ml-4 text-slate-700">
                                How many levels deep to crawl (optional, default: 2)
                              </span>
                            </li>
                            <li className="flex">
                              <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 w-20 flex-shrink-0">
                                limit
                              </span>
                              <span className="ml-4 text-slate-700">
                                Maximum number of pages to crawl (optional, default: 100)
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="sitemap">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">Parameters</h3>
                          <ul className="space-y-2">
                            <li className="flex">
                              <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 w-20 flex-shrink-0">
                                url
                              </span>
                              <span className="ml-4 text-slate-700">
                                The URL or domain to generate a sitemap for (required)
                              </span>
                            </li>
                            <li className="flex">
                              <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 w-20 flex-shrink-0">
                                format
                              </span>
                              <span className="ml-4 text-slate-700">
                                Response format: 'xml' or 'json' (optional, default: 'xml')
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="backlinks">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">Parameters</h3>
                          <ul className="space-y-2">
                            <li className="flex">
                              <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 w-20 flex-shrink-0">
                                url
                              </span>
                              <span className="ml-4 text-slate-700">
                                The URL or domain to find backlinks for (required)
                              </span>
                            </li>
                            <li className="flex">
                              <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 w-20 flex-shrink-0">
                                limit
                              </span>
                              <span className="ml-4 text-slate-700">
                                Maximum number of backlinks to return (optional, default: 100)
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to explore your web presence?</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Start using Carlapi today and discover everything about your website's structure and backlinks.
          </p>
          <Button
            className="h-12 px-8 bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Try it now
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
