import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"
import { codeExamples } from "@/lib/code-examples"

export const metadata: Metadata = {
  title: "API Documentation | Carlapi",
  description: "Comprehensive documentation for the Carlapi web crawler API",
}

export default function DocsPage() {
  // Fix: Define the baseUrl variable properly
  const baseUrl = "https://carlapi.vercel.app/api"

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-slate-600 hover:text-slate-900 p-0">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Carlapi Documentation</h1>
          <p className="text-xl text-slate-600 max-w-3xl">Comprehensive guide to using the Carlapi web crawler API</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <nav className="space-y-1">
                <a
                  href="#introduction"
                  className="block px-3 py-2 rounded-md bg-emerald-50 text-emerald-700 font-medium"
                >
                  Introduction
                </a>
                <a
                  href="#authentication"
                  className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Authentication
                </a>
                <a
                  href="#endpoints"
                  className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium"
                >
                  API Endpoints
                </a>
                <a
                  href="#rate-limits"
                  className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Rate Limits
                </a>
                <a
                  href="#examples"
                  className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Code Examples
                </a>
                <a href="#postman" className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium">
                  Postman Setup
                </a>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-12">
            <section id="introduction">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
              <div className="prose prose-slate max-w-none">
                <p>
                  Carlapi is a powerful web crawling API that allows you to discover pages, generate sitemaps, and
                  analyze backlinks for any website. The API is designed to be simple to use while providing
                  comprehensive data about web pages.
                </p>
                <p>
                  All API endpoints are accessible via HTTPS at <code>{baseUrl}</code>. The API returns data in JSON
                  format (except for the sitemap endpoint which can return XML).
                </p>
              </div>
            </section>

            <section id="authentication">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Authentication</h2>
              <div className="prose prose-slate max-w-none">
                <p>
                  Currently, the API is available for public use without authentication. However, rate limits apply to
                  prevent abuse.
                </p>
                <p>
                  In the future, we plan to introduce API key authentication for premium features and higher rate
                  limits.
                </p>
              </div>
            </section>

            <section id="endpoints">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">API Endpoints</h2>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>GET /api/crawl</CardTitle>
                    <CardDescription>Crawl a website to discover all pages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Parameters</h4>
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

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Response</h4>
                      <pre className="p-4 rounded-lg bg-slate-900 overflow-x-auto text-sm text-slate-300">
                        <code>{`{
  "url": "https://example.com",
  "pages": [
    { "url": "https://example.com/", "title": "Example Domain", "status": 200 },
    { "url": "https://example.com/about", "title": "About Us", "status": 200 }
  ],
  "redirects": [
    { "from": "https://example.com/old", "to": "https://example.com/new", "status": 301 }
  ],
  "backlinks": [
    { "source": "https://referrer.com", "target": "https://example.com" }
  ]
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>GET /api/sitemap</CardTitle>
                    <CardDescription>Generate an XML sitemap for a domain</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Parameters</h4>
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
                            Maximum number of URLs to include (optional, default: 1000)
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

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Response (XML format)</h4>
                      <pre className="p-4 rounded-lg bg-slate-900 overflow-x-auto text-sm text-slate-300">
                        <code>{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2023-05-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2023-05-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>GET /api/backlinks</CardTitle>
                    <CardDescription>Discover backlinks pointing to a domain</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Parameters</h4>
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

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Response</h4>
                      <pre className="p-4 rounded-lg bg-slate-900 overflow-x-auto text-sm text-slate-300">
                        <code>{`{
  "url": "https://example.com",
  "backlinks": [
    {
      "source": "https://referrer.com/blog",
      "target": "https://example.com",
      "anchorText": "Example Website"
    },
    {
      "source": "https://another-site.com/resources",
      "target": "https://example.com/about",
      "anchorText": "Learn more about Example"
    }
  ]
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="rate-limits">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Rate Limits</h2>
              <div className="prose prose-slate max-w-none">
                <p>To ensure fair usage and service stability, the following rate limits apply:</p>
                <ul>
                  <li>100 requests per hour per IP address</li>
                  <li>Maximum crawl depth of 3 levels</li>
                  <li>Maximum of 1000 pages per crawl</li>
                </ul>
                <p>If you need higher limits for your project, please contact us to discuss enterprise options.</p>
              </div>
            </section>

            <section id="examples">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Code Examples</h2>

              <Tabs defaultValue="javascript">
                <TabsList className="mb-4">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="java">Java</TabsTrigger>
                  <TabsTrigger value="csharp">C#</TabsTrigger>
                </TabsList>
                <TabsContent value="javascript">
                  <CodeBlock language="javascript" code={codeExamples.javascript} />
                </TabsContent>
                <TabsContent value="python">
                  <CodeBlock language="python" code={codeExamples.python} />
                </TabsContent>
                <TabsContent value="java">
                  <CodeBlock language="java" code={codeExamples.java} />
                </TabsContent>
                <TabsContent value="csharp">
                  <CodeBlock language="csharp" code={codeExamples.csharp} />
                </TabsContent>
              </Tabs>
            </section>

            <section id="postman">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Postman Setup</h2>

              <div className="prose prose-slate max-w-none">
                <p>
                  Postman is a popular API client that makes it easy to test and use APIs. Follow these steps to set up
                  Carlapi in Postman:
                </p>

                <ol>
                  <li>
                    <strong>Create a new collection</strong>
                    <p>Open Postman and create a new collection named "Carlapi".</p>
                  </li>
                  <li>
                    <strong>Add environment variables</strong>
                    <p>Create a new environment and add a variable named "base_url" with the value "{baseUrl}".</p>
                  </li>
                  <li>
                    <strong>Create requests</strong>
                    <p>Add the following requests to your collection:</p>
                    <ul>
                      <li>
                        <strong>Crawl Website</strong>
                        <ul>
                          <li>Method: GET</li>
                          <li>URL: {"{{base_url}}/crawl?url=https://example.com"}</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Generate Sitemap</strong>
                        <ul>
                          <li>Method: GET</li>
                          <li>URL: {"{{base_url}}/sitemap?url=https://example.com"}</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Find Backlinks</strong>
                        <ul>
                          <li>Method: GET</li>
                          <li>URL: {"{{base_url}}/backlinks?url=https://example.com"}</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Test the API</strong>
                    <p>
                      Select the "Crawl Website" request and click "Send" to test the API. You should receive a JSON
                      response with the crawl results.
                    </p>
                  </li>
                </ol>

                <p>
                  You can also download our{" "}
                  <a href="#" className="text-emerald-600 hover:text-emerald-800">
                    Postman Collection
                  </a>{" "}
                  to get started quickly.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
