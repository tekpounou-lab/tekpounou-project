import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Card } from "@/components/ui/Card"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

type Service = {
  id: string
  title: string
  description: string
  price?: number
  created_at?: string
}

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchService = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from<Service>("services") // ✅ assumes "services" table in Supabase
          .select("*")
          .eq("id", id)
          .single()

        if (error) throw error
        setService(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">Error: {error}</p>
  }

  if (!service) {
    return <p className="text-gray-500 text-center mt-8">Service not found.</p>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">{service.title}</h1>
        <p className="text-gray-700 mb-4">{service.description}</p>
        {service.price !== undefined && (
          <p className="text-lg font-semibold text-green-600">
            Price: ${service.price}
          </p>
        )}
        {service.created_at && (
          <p className="text-sm text-gray-400 mt-4">
            Added on {new Date(service.created_at).toLocaleDateString()}
          </p>
        )}
      </Card>
    </div>
  )
}
