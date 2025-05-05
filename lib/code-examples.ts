export const codeExamples = {
  javascript: `// Using fetch API
async function crawlWebsite(url) {
  const response = await fetch(
    \`https://carlapi.vercel.app/api/crawl?url=\${encodeURIComponent(url)}\`
  );
  
  if (!response.ok) {
    throw new Error(\`Error: \${response.status}\`);
  }
  
  return await response.json();
}

// Example usage
crawlWebsite('https://example.com')
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,

  python: `import requests

def crawl_website(url):
    response = requests.get(
        f"https://carlapi.vercel.app/api/crawl",
        params={"url": url}
    )
    
    response.raise_for_status()  # Raise exception for 4XX/5XX responses
    return response.json()

# Example usage
try:
    data = crawl_website("https://example.com")
    print(data)
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")`,

  java: `import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class CarlapiExample {
    public static void main(String[] args) {
        try {
            String url = "https://example.com";
            String encodedUrl = URLEncoder.encode(url, StandardCharsets.UTF_8);
            
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://carlapi.vercel.app/api/crawl?url=" + encodedUrl))
                .GET()
                .build();
            
            HttpResponse<String> response = client.send(request, 
                HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() == 200) {
                System.out.println(response.body());
            } else {
                System.err.println("Error: " + response.statusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,

  csharp: `using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

class CarlapiExample
{
    static async Task Main()
    {
        try
        {
            string url = "https://example.com";
            string encodedUrl = HttpUtility.UrlEncode(url);
            
            using var client = new HttpClient();
            var response = await client.GetAsync(
                $"https://carlapi.vercel.app/api/crawl?url={encodedUrl}");
            
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            
            Console.WriteLine(responseBody);
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Error: {e.Message}");
        }
    }
}`,
}
