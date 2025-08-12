import Header from "@/components/header"
import Footer from "@/components/footer"
import { Phone, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Customer Support</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We&apos;re here to help you get the most out of your TOOLS APEX products. Get expert support when you need it.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <Phone className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Speak with our experts</p>
            <p className="font-bold text-lg">1-800-TOOLS-APEX</p>
            <p className="text-sm text-gray-500">Mon-Fri: 7AM-7PM CST</p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <MessageCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Get instant help online</p>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Start Chat</Button>
            <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <Mail className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us your questions</p>
            <p className="font-bold">support@toolsapex.com</p>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </div>
        </div>

        {/* Support Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input placeholder="Enter your first name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input placeholder="Enter your last name" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="Enter your email address" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input type="tel" placeholder="Enter your phone number" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product-support">Product Support</SelectItem>
                  <SelectItem value="warranty">Warranty Claim</SelectItem>
                  <SelectItem value="parts">Parts & Repair</SelectItem>
                  <SelectItem value="order">Order Status</SelectItem>
                  <SelectItem value="return">Returns & Exchanges</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea placeholder="Describe your issue or question..." rows={6} />
            </div>

            <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold" size="lg">
              Send Message
            </Button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I register my product for warranty?",
                answer: "You can register your product online through our Product Registration page or mobile app.",
              },
              {
                question: "Where can I find user manuals?",
                answer: "All user manuals are available for download on our website under the Support section.",
              },
              {
                question: "How long is the warranty on TOOLS APEX products?",
                answer: "Most power tools come with a 3-year warranty, while hand tools have a lifetime warranty.",
              },
              {
                question: "Can I get replacement parts for my tools?",
                answer: "Yes, we stock replacement parts for all current and many discontinued models.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
