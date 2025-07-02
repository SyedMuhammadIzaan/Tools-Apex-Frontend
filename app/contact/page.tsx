import Header from "@/components/header"
import Footer from "@/components/footer"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team. We&apos;re here to help with any questions about our products or services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-yellow-400 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Headquarters</h3>
                  <p className="text-gray-600">
                    1234 Industrial Boulevard
                    <br />
                    Tool City, TC 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-yellow-400 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <p className="text-gray-600">1-800-TOOLS-APEX</p>
                  <p className="text-gray-600">(1-800-866-5727)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-yellow-400 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-gray-600">info@toolsapex.com</p>
                  <p className="text-gray-600">support@toolsapex.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-yellow-400 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 7:00 AM - 7:00 PM CST
                    <br />
                    Saturday: 8:00 AM - 5:00 PM CST
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Interactive Map Coming Soon</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input placeholder="Enter your first name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <Input placeholder="Enter your last name" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <Input type="email" placeholder="Enter your email address" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input type="tel" placeholder="Enter your phone number" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="product">Product Information</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="dealer">Dealer Information</SelectItem>
                    <SelectItem value="media">Media Inquiry</SelectItem>
                    <SelectItem value="careers">Careers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <Textarea placeholder="Please provide details about your inquiry..." rows={6} required />
              </div>

              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold" size="lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Additional Contact Options */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Sales Inquiries</h3>
            <p className="text-gray-600 mb-4">Questions about products or pricing</p>
            <Button variant="outline">Contact Sales</Button>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Technical Support</h3>
            <p className="text-gray-600 mb-4">Need help with your tools</p>
            <Button variant="outline">Get Support</Button>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Media Relations</h3>
            <p className="text-gray-600 mb-4">Press inquiries and media kits</p>
            <Button variant="outline">Media Center</Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
