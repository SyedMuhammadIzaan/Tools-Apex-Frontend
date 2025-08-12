import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Footer() {
  const footerLinks = {
    Shop: [
      { name: "ROTARY TILLERS", href: "/collections/rotary-tilers" },
      { name: "LAND MOWERS", href: "/collections/land-mowers" },
    ],
    "Privacy & Policies": [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Return Policy", href: "/return-policy" },
      { name: "Shipping Policy", href: "/shipping-policy" },
    ],
    "Social Links": [
      { name: "Facebook", href: "/secure-payments" },
      { name: "Instagram", href: "/payment-options" },
    ],
  }

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="bg-yellow-400 text-black py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Connected with TOOLS APEX</h3>
            <p className="text-lg mb-8">
              Get the latest product updates, exclusive offers, and expert tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white text-black border-0"
              />
              <Button className="bg-black text-yellow-400 hover:bg-gray-800 font-semibold px-8">Subscribe</Button>
            </div>
            <p className="text-sm mt-4 opacity-80">
              By subscribing, you agree to our{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-of-service" className="underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/">
                <h2 className="text-3xl font-bold text-yellow-400 mb-6">TOOLS APEX</h2>
              </Link>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">What is TOOLS APEX?</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  TOOLS APEX is a leading manufacturer and retailer of professional-grade power tools, outdoor
                  equipment, and innovative battery systems. We specialize in creating high-performance tools that
                  deliver exceptional reliability, durability, and value for both professional contractors and DIY
                  enthusiasts.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our revolutionary ONE+ battery platform powers over 200+ tools, making us the preferred choice for
                  those who demand versatility, efficiency, and professional results in every project.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-yellow-400" />
                  <span>+1 (299) 704-2319</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-yellow-400" />
                  <span>salestoolsapex@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                  <span>1234 Industrial Blvd, Tool City, TC 12345</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-lg mb-4 text-yellow-400">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <div className="text-center">
          <h3 className="text-xl font-bold text-yellow-400 mb-6">We Accept</h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <Image src="/placeholder.svg?height=40&width=60" alt="PayPal" width={60} height={40} className="h-8 w-12 object-contain" />
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <Image src="/placeholder.svg?height=40&width=60" alt="Mastercard" width={60} height={40} className="h-8 w-12 object-contain" />
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <Image src="/placeholder.svg?height=40&width=60" alt="Visa" width={60} height={40} className="h-8 w-12 object-contain" />
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <Image
                src="/placeholder.svg?height=40&width=60"
                alt="American Express"
                width={60}
                height={40}
                className="h-8 w-12 object-contain"
              />
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <Image src="/placeholder.svg?height=40&width=60" alt="Apple Pay" width={60} height={40} className="h-8 w-12 object-contain" />
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <Image src="/placeholder.svg?height=40&width=60" alt="Google Pay" width={60} height={40} className="h-8 w-12 object-contain" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">All transactions are secure and encrypted</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span>© 2024 TOOLS APEX POWERED BY SA FORMATIONS. All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Prices in USD</span>
              <span>|</span>
              <span>Free shipping WorldWide  </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
