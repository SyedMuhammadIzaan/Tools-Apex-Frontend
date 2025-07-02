import Header from "@/components/header"
import Footer from "@/components/footer"
import { Shield, Award, Wrench, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Product Registration</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Register your TOOLS APEX products to activate warranty coverage and receive important product updates.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Benefits */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <Shield className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Warranty Protection</h3>
            <p className="text-gray-600 text-sm">Activate your warranty coverage</p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Product Updates</h3>
            <p className="text-gray-600 text-sm">Get notified of recalls and updates</p>
          </div>
          <div className="text-center">
            <Wrench className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Priority Support</h3>
            <p className="text-gray-600 text-sm">Faster customer service</p>
          </div>
          <div className="text-center">
            <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Service History</h3>
            <p className="text-gray-600 text-sm">Track repairs and maintenance</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Register Your Product</h2>
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Model Number *</label>
                <Input placeholder="e.g., TA-CD18-001" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Serial Number *</label>
                <Input placeholder="Found on product label" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Category *</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select product category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="power-tools">Power Tools</SelectItem>
                  <SelectItem value="outdoor-power">Outdoor Power</SelectItem>
                  <SelectItem value="recreation">Recreation</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Purchase Date *</label>
              <Input type="date" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Where did you purchase this product?</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select retailer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home-depot">Home Depot</SelectItem>
                  <SelectItem value="lowes">Lowe&apos;s</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="direct">TOOLS APEX Direct</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="newsletter" className="rounded" />
              <label htmlFor="newsletter" className="text-sm">
                I would like to receive product updates and promotional offers via email
              </label>
            </div>

            <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold" size="lg">
              Register Product
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
