import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 px-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">null:kø</h1>
          <nav>
            <Button asChild variant="ghost">
              <Link href="/auth">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth">Sign up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            You know all those great ideas you have? We want you to try them out, many of them, and find out what works.
          </h2>
          <p className="text-xl mb-8">
            Try Null:Kø and start small, learn fast, and build each other up.
          </p>
          <Button asChild size="lg">
            <Link href="/auth">Try Null:Kø</Link>
          </Button>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Start Small</h3>
            <p>Begin with a simple idea and expand gradually. Null:Kø helps you manage queues efficiently, regardless of size.</p>
          </div>
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Learn Fast</h3>
            <p>Get immediate feedback and insights from your customers. Adapt and improve your service based on real data.</p>
          </div>
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Build Each Other Up</h3>
            <p>Become part of a community of innovative service providers. Share experiences and grow together with other Null:Kø users.</p>
          </div>
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Transform the Way You Queue</h3>
            <p>Change how you handle waiting times and customer service. Null:Kø gives you the tools to create a smooth and efficient experience.</p>
          </div>
        </section>
      </main>
      <footer className="py-6 px-4 border-t">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Null:Kø. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}