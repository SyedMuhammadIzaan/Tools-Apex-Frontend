import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300">Last updated: December 26, 2024</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="mb-6">
            We collect information you provide directly to us, such as when you create an account, make a purchase,
            register a product, or contact us for support. This may include your name, email address, phone number,
            shipping address, and payment information.
          </p>

          <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
          <p className="mb-6">
            We use the information we collect to provide, maintain, and improve our services, process transactions, send
            you technical notices and support messages, and communicate with you about products, services, and
            promotional offers.
          </p>

          <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
          <p className="mb-6">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your
            consent, except as described in this policy. We may share your information with service providers who assist
            us in operating our website and conducting our business.
          </p>

          <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
          <p className="mb-6">
            We implement appropriate security measures to protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
          <p className="mb-6">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic,
            and understand where our visitors are coming from. You can control cookies through your browser settings.
          </p>

          <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
          <p className="mb-6">
            You have the right to access, update, or delete your personal information. You may also opt out of certain
            communications from us. To exercise these rights, please contact us using the information provided below.
          </p>

          <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <br />
            TOOLS APEX
            <br />
            1234 Industrial Boulevard
            <br />
            Tool City, TC 12345
            <br />
            Email: privacy@toolsapex.com
            <br />
            Phone: 1-800-TOOLS-APEX
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
