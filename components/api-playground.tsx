"use client"

import { useState } from "react"
import { Play, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface ApiResponse {
  data: any
  status: number
  time: number
}

export default function ApiPlayground() {
  const [activeEndpoint, setActiveEndpoint] = useState("crawl")
  const [url, setUrl] = useState("")
  const [depth, setDepth] = useState(2)
  const [limit, setLimit] = useState(100)
  const [format, setFormat] = useState("json")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!url) {
      setError("URL is required")
      return
    }

    setIsLoading(true)
    setError(null)
    const startTime = performance.now()

    try {
      let apiUrl = `/api/${activeEndpoint}?url=${encodeURIComponent(url)}`

      if (activeEndpoint === "crawl" || activeEndpoint === "sitemap") {
        apiUrl += `&depth=${depth}&limit=${limit}`
      }

      if (activeEndpoint === "sitemap") {
        apiUrl += `&format=${format}`
      }

      const res = await fetch(apiUrl)
      let data
      if (format === "xml" && activeEndpoint === "sitemap") {
        data = await res.text()
      } else {
        // Check if the response is JSON before parsing
        const contentType = res.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          data = await res.json()
        } else {
          // Handle non-JSON responses
          const text = await res.text()
          data = { message: text }
        }
      }

      setResponse({
        data,
        status: res.status,
        time: Math.round(performance.now() - startTime),
      })
    } catch (err) {
      setError("An error occurred while fetching data")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>API Playground</CardTitle>
          <CardDescription>Test the Carlapi endpoints in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeEndpoint} onValueChange={setActiveEndpoint} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="crawl">Crawl</TabsTrigger>
              <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
              <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
            </TabsList>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              {(activeEndpoint === "crawl" || activeEndpoint === "sitemap") && (
                <>
                  <div>
                    <Label htmlFor="depth">Crawl Depth: {depth}</Label>
                    <Slider
                      id="depth"
                      min={1}
                      max={5}
                      step={1}
                      value={[depth]}
                      onValueChange={(value) => setDepth(value[0])}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="limit">Page Limit: {limit}</Label>
                    <Slider
                      id="limit"
                      min={10}
                      max={1000}
                      step={10}
                      value={[limit]}
                      onValueChange={(value) => setLimit(value[0])}
                      className="mt-2"
                    />
                  </div>
                </>
              )}

              {activeEndpoint === "sitemap" && (
                <div>
                  <Label htmlFor="format">Response Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="format" className="mt-2">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading || !url}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Request
                </>
              )}
            </Button>
          </Tabs>
        </CardContent>
      </Card>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">{error}</div>}

      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Response</span>
              <span className="text-sm font-normal text-slate-500">
                Status: {response.status} | Time: {response.time}ms
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-950 rounded-lg p-4 overflow-auto max-h-[500px]">
              <pre className="text-slate-300 text-sm">
                {format === "xml" && activeEndpoint === "sitemap"
                  ? response.data
                  : JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
