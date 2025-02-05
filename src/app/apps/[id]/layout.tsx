import 'github-markdown-css'
export default function AppDetailLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>
}
