import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import CategoryBrowser from "@/components/category-browser"
import MowerHelper from "@/components/mower-helper"
import SavingsSection from "@/components/savings-section"
import CollectionList from "@/components/collection-list"
import AboutSection from "@/components/about-section"
import BlogSection from "@/components/blog-section"
import FAQSection from "@/components/faq-section"
import TestimonialsSection from "@/components/testimonials-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <CategoryBrowser />
        <SavingsSection />
        <CollectionList />
        <AboutSection />
        <BlogSection />
        <FAQSection />
        <TestimonialsSection />
        <Footer />
        <MowerHelper />
      </main>
    </div>
  )
}
