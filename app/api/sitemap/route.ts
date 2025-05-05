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

// Helper function to generate XML sitemap
function generateSitemap(urls: string[]): string {
  const urlElements = urls
    .map(
      (url) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `,
    )
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlElements}
</urlset>`
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get("url")
  const depthParam = searchParams.get("depth")
  const limitParam = searchParams.get("limit")
  const format = searchParams.get("format") || "xml"

  // Validate URL parameter
  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  // Parse optional parameters
  const maxDepth = depthParam ? Number.parseInt(depthParam, 10) : 2
  const maxPages = limitParam ? Number.parseInt(limitParam, 10) : 1000

  try {
    // Validate URL format
    const baseUrl = new URL(url).href
    const baseDomain = new URL(url).origin

    // Initialize data structures
    const urls: string[] = []
    const visited = new Set<string>()
    const queue: { url: string; depth: number }[] = [{ url: baseUrl, depth: 0 }]

    // Crawl the website to collect URLs
    while (queue.length > 0 && urls.length < maxPages) {
      const { url: currentUrl, depth } = queue.shift()!

      // Skip if already visited or exceeds max depth
      if (visited.has(currentUrl) || depth > maxDepth) {
        continue
      }

      visited.add(currentUrl)

      try {
        // Fetch the page
        const response = await fetch(currentUrl, {
          headers: {
            "User-Agent": "Carlapi Sitemap Generator/1.0",
          },
        })

        // Skip non-successful responses
        if (!response.ok) {
          continue
        }

        // Skip non-HTML responses
        const contentType = response.headers.get("content-type") || ""
        if (!contentType.includes("text/html")) {
          urls.push(currentUrl)
          continue
        }

        // Parse HTML content
        const html = await response.text()
        const $ = cheerio.load(html)

        // Add current URL to results
        urls.push(currentUrl)

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

              // Only process internal links
              if (isSameDomain(linkedUrl, baseDomain) && !visited.has(linkedUrl)) {
                queue.push({ url: linkedUrl, depth: depth + 1 })
              }
            }
          })
        }
      } catch (error) {
        console.error(`Error fetching ${currentUrl}:`, error)
      }
    }

    // Return the sitemap in requested format
    if (format === "json") {
      return NextResponse.json({ urls })
    } else {
      const sitemap = generateSitemap(urls)
      return new NextResponse(sitemap, {
        headers: {
          "Content-Type": "application/xml",
        },
      })
    }
  } catch (error) {
    console.error("Sitemap generation error:", error)
    return NextResponse.json({ error: "Failed to generate sitemap" }, { status: 500 })
  }
}
