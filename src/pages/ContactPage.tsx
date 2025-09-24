import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/AccessibilityComponents" // assuming you have a textarea here
import { Card } from "@/components/ui/Card"
import { toast } from "react-hot-toast"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, just show a toast — you can later hook this into Supabase or Netlify Functions
    toast.success("Message sent successfully!")
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Card className="p-8 shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Name</label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1">Message</label>
            <Textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={5}
              required
            />
          </div>
          <div className="text-center">
            <Button type="submit" className="px-6 py-2">Send Message</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
