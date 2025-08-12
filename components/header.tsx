"use client"

import { useState } from "react"
import { Search, ShoppingCart, Menu, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    {
      name: "Top Categories",
      items: [
        { name: "Land Mowers", href: "/collections/land-mowers" },
        { name: "Rotary Tillers", href: "/collections/rotary-tillers" },
        // { name: "Land Mowers", href: "/new-products" },
        // { name: "Rotary Tillers", href: "/best-sellers" },
      ],
    },
    // all dropdowns need to remove except top categories
    {
      name: "Our News",
      // items: [
      //   { name: "Drills", href: "/collections/power-tools?filter=drills" },
      //   { name: "Saws", href: "/collections/power-tools?filter=saws" },
      //   { name: "Sanders", href: "/collections/power-tools?filter=sanders" },
      //   { name: "Grinders", href: "/collections/power-tools?filter=grinders" },
      //   { name: "Impact Drivers", href: "/collections/power-tools?filter=impact-drivers" },
      // ],
    },
    {
      name: "Savings",
      // items: [
      //   { name: "Lawn Mowers", href: "/collections/land-mowers" },
      //   { name: "Trimmers", href: "/collections/outdoor-power?filter=trimmers" },
      //   { name: "Blowers", href: "/collections/outdoor-power?filter=blowers" },
      //   { name: "Chainsaws", href: "/collections/outdoor-power?filter=chainsaws" },
      //   { name: "Hedge Trimmers", href: "/collections/outdoor-power?filter=hedge-trimmers" },
      // ],
    },
    {
      name: "Top Selling Products",
      // items: [
      //   { name: "Coolers", href: "/collections/recreation?filter=coolers" },
      //   { name: "Speakers", href: "/collections/recreation?filter=speakers" },
      //   { name: "Lighting", href: "/collections/recreation?filter=lighting" },
      //   { name: "Inflatables", href: "/collections/recreation?filter=inflatables" },
      //   { name: "Camping Gear", href: "/collections/recreation?filter=camping" },
      // ],
    },
    {
      name: "Support",
      // items: [
      //   { name: "Pressure Washers", href: "/collections/cleaning?filter=pressure-washers" },
      //   { name: "Vacuums", href: "/collections/cleaning?filter=vacuums" },
      //   { name: "Floor Care", href: "/collections/cleaning?filter=floor-care" },
      //   { name: "Car Care", href: "/collections/cleaning?filter=car-care" },
      //   { name: "Steam Cleaners", href: "/collections/cleaning?filter=steam-cleaners" },
      // ],
    },
  ]

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-yellow-400 text-black text-center py-2 px-4 text-sm font-medium">
        FREE & FAST DELIVERY WORLDWIDE
      </div>

      {/* Main Header */}
      <header className="bg-black/95 backdrop-blur-sm text-white relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black text-white">
                <div className="flex flex-col space-y-8 mt-8">
                  {/* Categories Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-yellow-400 text-lg">Categories</h3>
                    <div className="space-y-2">
                      <Link href="/collections/land-mowers" className="block text-sm hover:text-yellow-400 pl-4">
                        Land Mowers
                      </Link>
                      <Link href="/collections/rotary-tilers" className="block text-sm hover:text-yellow-400 pl-4">
                        Rotary Tillers
                      </Link>
                    </div>
                  </div>

                  {/* Social Links Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-yellow-400 text-lg">Social Links</h3>
                    <div className="flex space-x-4 pl-4">
                      <Link href="#" className="text-white hover:text-yellow-400">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </Link>
                      <Link href="#" className="text-white hover:text-yellow-400">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* We Accept Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-yellow-400 text-lg">We Accept</h3>
                    <div className="grid grid-cols-3 gap-2 pl-4">
                      <div className="bg-white p-2 rounded">
                        <Image
                          src="/placeholder.svg?height=20&width=32"
                          alt="PayPal"
                          className="h-4 w-8 object-contain"
                          width={32}
                          height={20}
                        />
                      </div>
                      <div className="bg-white p-2 rounded">
                        <Image
                          src="/placeholder.svg?height=20&width=32"
                          alt="Mastercard"
                          className="h-4 w-8 object-contain"
                          width={32}
                          height={20}
                        />
                      </div>
                      <div className="bg-white p-2 rounded">
                        <Image src="/placeholder.svg?height=20&width=32" alt="Visa" className="h-4 w-8 object-contain" width={32} height={20} />
                      </div>
                      <div className="bg-white p-2 rounded">
                        <Image
                          src="/placeholder.svg?height=20&width=32"
                          alt="Google Pay"
                          className="h-4 w-8 object-contain"
                          width={32}
                          height={20}
                        />
                      </div>
                      <div className="bg-white p-2 rounded">
                        <Image
                          src="/placeholder.svg?height=20&width=32"
                          alt="Apple Pay"
                          className="h-4 w-8 object-contain"
                          width={32}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4 lg:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Can we help you find something?"
                  className="pl-10 bg-white text-black border-0 rounded-md"
                />
              </div>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-yellow-400">TOOLS APEX</h1>
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4 ml-4">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center space-x-1 text-white hover:text-yellow-400"
              >
                <Link href="/support">
                  <Phone className="h-4 w-4" />
                  <span>Support</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center space-x-1 text-white hover:text-yellow-400"
              >
                <Link href="/register-products">
                  <User className="h-4 w-4" />
                  <span>Register Products</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="text-white hover:text-yellow-400">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block border-t border-gray-800">
            <NavigationMenu className="max-w-none w-full">
              <NavigationMenuList className="flex justify-center space-x-8 py-4">
                {/* {categories.map((category) => (
                  <NavigationMenuItem key={category.name}>
                    <NavigationMenuTrigger className="text-white hover:text-yellow-400 bg-transparent">
                      {category.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] p-4 bg-black border border-gray-800">
                        {category?.items?.map((item,index) => {
                          console.log("Item", item);
                          return (
                            <NavigationMenuLink key={index} asChild>
                              <Link
                                href={item?.href}
                                className="block p-2 text-white hover:text-yellow-400 hover:bg-gray-900 rounded"
                              >
                                {item?.name}
                              </Link>
                            </NavigationMenuLink>
                          );
                        })}

                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))} */}
                {categories.map((category) => (
                  <NavigationMenuItem key={category.name}>
                    {category.items ? (
                      <>
                        <NavigationMenuTrigger className="text-white hover:text-yellow-400 bg-transparent">
                          {category.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] p-4 bg-black border border-gray-800">
                            {category.items.map((item, index) => (
                              <NavigationMenuLink key={index} asChild>
                                <Link
                                  href={item.href}
                                  className="block p-2 text-white hover:text-yellow-400 hover:bg-gray-900 rounded"
                                >
                                  {item.name}
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href="#"
                          className="text-white hover:text-yellow-400 bg-transparent px-4 py-2 block"
                        >
                          {category.name}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}

              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </header>
    </>
  )
}
