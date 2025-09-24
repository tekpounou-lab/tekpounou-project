// src/pages/contact/ContactPage.tsx
import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/AccessibilityComponents"

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: hook this into Supabase/Netlify function for sending messages
    console.log("Contact form submitted:", form)
    alert("Thank you for contacting us! We'll get back to you soon.")
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Card className="p-8 shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-gray-600 mb-8 text-center">
          Have questions or feedback? Send us a message below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border rounded-lg p-3"
          />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default ContactPage
