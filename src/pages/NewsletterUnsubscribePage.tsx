import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

function NewsletterUnsubscribePage() {
  const [unsubscribed, setUnsubscribed] = useState(false)

  const handleUnsubscribe = () => {
    // TODO: Add API call to actually remove email from newsletter list
    setUnsubscribed(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="max-w-md w-full p-6 text-center shadow-lg rounded-2xl">
        {!unsubscribed ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Unsubscribe from Newsletter
            </h1>
            <p className="text-gray-600 mb-6">
              Are you sure you want to unsubscribe from our newsletter? You’ll
              stop receiving updates and promotions.
            </p>
            <Button
              onClick={handleUnsubscribe}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Unsubscribe Me
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              You’ve been unsubscribed
            </h1>
            <p className="text-gray-600 mb-6">
              Sorry to see you go! You can re-subscribe anytime from your
              account settings or our homepage.
            </p>
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <a href="/">Back to Home</a>
            </Button>
          </>
        )}
      </Card>
    </div>
  )
}

export default NewsletterUnsubscribePage
