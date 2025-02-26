import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <span>info@learnhub.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>
                  123 Education Street
                  <br />
                  Learning City, LC 12345
                  <br />
                  United States
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

