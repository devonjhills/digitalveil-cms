import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Enhanced with animation and stronger CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-background/90">
        <div className="container flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
              Modern Living Redefined
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Mindful Living in a Digital World
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover practical tips and insights for creating balanced,
              healthy, and productive digital spaces that enhance your wellbeing
              and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button className="group neobrutalist-button text-lg px-6 py-6 flex items-center">
                <Link href="/posts" className="flex items-center">
                  Explore Articles
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 relative w-full aspect-video brutal-border brutal-shadow brutal-shadow-hover transition-all rounded-xl overflow-hidden">
            <Image
              src="/hero.jpg"
              alt="Ergonomic workspace"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced with stronger visual design */}
      <section className="bg-primary py-16 md:py-20 text-primary-foreground">
        <div className="container text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Transform Your Digital Life?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Explore our comprehensive guides and start creating a more balanced,
            healthy relationship with technology today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="neobrutalist-button bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6">
              <Link href="/posts">Explore All Articles</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
