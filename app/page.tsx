import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Mindful Living in a Digital World
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover practical tips and insights on creating healthy and
              productive remote workspaces and ergonomic home offices that
              support your well-being.
            </p>
            <Button className="neobrutalist-button text-lg">
              <Link href="/posts">Explore Now</Link>
            </Button>
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

      {/* Featured Section: Key Areas of Focus */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-foreground">
            Key Areas of Focus
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="neobrutalist-card overflow-hidden">
              <div className="relative w-full aspect-square overflow-hidden brutal-border rounded-lg">
                <Image
                  src="/ergonomic.jpg"
                  alt="Ergonomic setup"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Ergonomic Setups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Optimize your workspace for comfort and prevent pain and
                  strain. Learn about posture, chair selection, and desk setups.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="font-bold text-primary text-underline p-0">
                  <Link href="/ergonomics">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card className="neobrutalist-card overflow-hidden">
              <div className="relative w-full aspect-square overflow-hidden brutal-border rounded-lg">
                <Image
                  src="/remote-work.jpg"
                  alt="Remote work"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">
                  Remote Work Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Master the art of working remotely, enhancing productivity,
                  and maintaining a healthy work-life balance.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="font-bold text-primary text-underline p-0">
                  <Link href="/remote-work">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Card 3 */}
            <Card className="neobrutalist-card overflow-hidden">
              <div className="relative w-full aspect-square overflow-hidden brutal-border rounded-lg">
                <Image
                  src="/digital-wellness.jpg"
                  alt="Digital wellness"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Digital Wellness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Protect your mental and physical health in the digital age.
                  Discover tips for reducing screen time and managing stress.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="font-bold text-primary text-underline p-0">
                  <Link href="/digital-wellness">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold mb-8">
            Ready to Transform Your Digital Life?
          </h2>
          <Button className="neobrutalist-button bg-background text-foreground hover:bg-background/90 text-lg">
            <Link href="/posts">Explore All Articles</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
