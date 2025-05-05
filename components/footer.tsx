export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-4">
            Carl<span className="text-emerald-500">api</span>
          </div>
          <p className="text-slate-400 mb-4 max-w-md mx-auto">
            A powerful web crawling API for discovering pages, generating sitemaps, and analyzing backlinks.
          </p>
          <p className="text-sm text-slate-500 mt-8">&copy; {new Date().getFullYear()} Carlapi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
