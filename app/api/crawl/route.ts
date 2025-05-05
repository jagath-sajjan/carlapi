import { type NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"
import { URL } from "url"

// Helper function to normalize URLs
function normalizeUrl(url: string, base: string): string {
  try {
    return new URL(url, base).href
  } catch (error) {
    return ""
  }
}

// Helper function to check if a URL is within the same domain
function isSameDomain(url: string, baseDomain: string): boolean {
  try {
    const urlObj = new URL(url)
    const baseObj = new URL(baseDomain)
    return urlObj.hostname === baseObj.hostname
  } catch (error) {
    return false
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get("url")
  const depthParam = searchParams.get("depth")
  const limitParam = searchParams.get("limit")

  // Validate URL parameter
  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  // Parse optional parameters
  const maxDepth = depthParam ? Number.parseInt(depthParam, 10) : 2
  const maxPages = limitParam ? Number.parseInt(limitParam, 10) : 100

  try {
    // Validate URL format
    const baseUrl = new URL(url).href
    const baseDomain = new URL(url).origin

    // Initialize data structures
    const pages: { url: string; title: string; status: number }[] = []
    const redirects: { from: string; to: string; status: number }[] = []
    const backlinks: { source: string; target: string }[] = []
    const visited = new Set<string>()
    const queue: { url: string; depth: number }[] = [{ url: baseUrl, depth: 0 }]

    // Crawl the website
    while (queue.length > 0 && pages.length < maxPages) {
      const { url: currentUrl, depth } = queue.shift()!

      // Skip if already visited or exceeds max depth
      if (visited.has(currentUrl) || depth > maxDepth) {
        continue
      }

      visited.add(currentUrl)

      try {
        // Fetch the page
        const response = await fetch(currentUrl, {
          redirect: "manual",
          headers: {
            "User-Agent": "Carlapi Web Crawler/1.0",
          },
        })

        // Handle redirects
        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get("location")
          if (location) {
            const redirectUrl = normalizeUrl(location, currentUrl)
            redirects.push({
              from: currentUrl,
              to: redirectUrl,
              status: response.status,
            })

            // Add redirect target to queue if it's within the same domain
            if (isSameDomain(redirectUrl, baseDomain) && !visited.has(redirectUrl)) {
              queue.push({ url: redirectUrl, depth: depth + 1 })
            }
          }
          continue
        }

        // Skip non-HTML responses
        const contentType = response.headers.get("content-type") || ""
        if (!contentType.includes("text/html")) {
          pages.push({
            url: currentUrl,
            title: "",
            status: response.status,
          })
          continue
        }

        // Parse HTML content
        const html = await response.text()
        const $ = cheerio.load(html)

        // Extract page title
        const title = $("title").text().trim()

        // Add page to results
        pages.push({
          url: currentUrl,
          title,
          status: response.status,
        })

        // Extract links if not at max depth
        if (depth < maxDepth) {
          $("a[href]").each((_, element) => {
            const href = $(element).attr("href")
            if (href) {
              const linkedUrl = normalizeUrl(href, currentUrl)

              // Skip empty or javascript: URLs
              if (!linkedUrl || linkedUrl.startsWith("javascript:")) {
                return
              }

              // Check if it's an external link
              if (!isSameDomain(linkedUrl, baseDomain)) {
                // Add as a potential backlink (though this isn't a true backlink check)
                backlinks.push({
                  source: linkedUrl,
                  target: currentUrl,
                })
                return
              }

              // Add internal link to queue
              if (!visited.has(linkedUrl)) {
                queue.push({ url: linkedUrl, depth: depth + 1 })
              }
            }
          })
        }
      } catch (error) {
        console.error(`Error fetching ${currentUrl}:`, error)
        // Add failed page to results
        pages.push({
          url: currentUrl,
          title: "",
          status: 0, // Error status
        })
      }
    }

    // Return the crawl results
    return NextResponse.json({
      url: baseUrl,
      pages,
      redirects,
      backlinks,
    })
  } catch (error) {
    console.error("Crawl error:", error)
    return NextResponse.json({ error: "Failed to crawl the website" }, { status: 500 })
  }
}
