import { type NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"
import { URL } from "url"

interface Backlink {
  source: string
  target: string
  anchorText: string
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get("url")
  const limitParam = searchParams.get("limit")

  // Validate URL parameter
  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  // Parse optional parameters
  const maxBacklinks = limitParam ? Number.parseInt(limitParam, 10) : 100

  try {
    // Validate URL format
    const targetUrl = new URL(url).href
    const targetDomain = new URL(url).hostname

    // In a real implementation, we would use a backlink database or service
    // For this demo, we'll simulate finding backlinks by searching for the domain
    // in a few predefined sources

    // This is a simplified implementation - in a real-world scenario,
    // you would need to use a backlink database or search engine API

    const backlinks: Backlink[] = []
    const potentialSources = [
      "https://example.com",
      "https://example.org",
      "https://example.net",
      // In a real implementation, this would be a much larger list or API call
    ]

    for (const source of potentialSources) {
      if (backlinks.length >= maxBacklinks) break

      try {
        const response = await fetch(source, {
          headers: {
            "User-Agent": "Carlapi Backlink Analyzer/1.0",
          },
        })

        if (!response.ok) continue

        const contentType = response.headers.get("content-type") || ""
        if (!contentType.includes("text/html")) continue

        const html = await response.text()
        const $ = cheerio.load(html)

        $("a[href]").each((_, element) => {
          if (backlinks.length >= maxBacklinks) return false

          const href = $(element).attr("href") || ""
          const anchorText = $(element).text().trim()

          try {
            const linkUrl = new URL(href, source)

            // Check if this link points to our target domain
            if (linkUrl.hostname === targetDomain) {
              backlinks.push({
                source,
                target: linkUrl.href,
                anchorText,
              })
            }
          } catch (error) {
            // Invalid URL, skip
          }
        })
      } catch (error) {
        console.error(`Error analyzing ${source}:`, error)
      }
    }

    // In a real implementation, we would return actual backlinks
    // For this demo, we'll return some simulated backlinks

    // Simulate some backlinks for demonstration purposes
    const simulatedBacklinks: Backlink[] = [
      {
        source: "https://example.com/blog/web-tools",
        target: targetUrl,
        anchorText: "Useful Web Crawler API",
      },
      {
        source: "https://example.org/resources",
        target: targetUrl,
        anchorText: "Carlapi - Web Crawler",
      },
      {
        source: "https://webtools.example.net/apis",
        target: targetUrl,
        anchorText: "Recommended Tools",
      },
    ]

    return NextResponse.json({
      url: targetUrl,
      backlinks: [...backlinks, ...simulatedBacklinks].slice(0, maxBacklinks),
    })
  } catch (error) {
    console.error("Backlink analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze backlinks" }, { status: 500 })
  }
}
