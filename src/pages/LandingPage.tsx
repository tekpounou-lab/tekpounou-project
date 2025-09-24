import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { NewsletterSignup } from "@/components/marketing/NewsletterSignup"

// Optional: in the future this can be fetched from Supabase or CMS
const landingPageContent: Record<string, { title: string; description: string; cta: string }> = {
  "default": {
    title: "Welcome to Tek Pou Nou",
    description: "Empowering communities with education, services, and growth opportunities.",
    cta: "Join Now"
  },
  "ai-course": {
    title: "Master AI with Our New Course",
    description: "Learn AI fundamentals, real-world use cases, and advanced techniques with hands-on projects.",
    cta: "Enroll Today"
  },
  "services": {
    title: "Discover Our Services",
    description: "Explore the range of services we provide to support students, teachers, and communities.",
    cta: "Get Started"
  }
}

export default function LandingPage() {
  const { slug } = useParams<{ slug: string }>()
  const content = landingPageContent[slug || "default"]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <Helmet>
        <title>{content.title} | Tek Pou Nou</title>
        <meta name="description" content={content.description} />
      </Helmet>

      <Card className="max-w-2xl p-8 text-center shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{content.description}</p>
        <Button>{content.cta}</Button>
      </Card>

      {/* Newsletter CTA */}
      <div className="mt-10 w-full max-w-md">
        <NewsletterSignup />
      </div>
    </div>
  )
}
