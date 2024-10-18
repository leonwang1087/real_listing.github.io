import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Ruler, Facebook, Twitter, Instagram } from 'lucide-react'

const ADMIN_EMAIL = 'johndoe@example.com';

export default function RealEstatePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const images = [
    '/placeholder.svg?height=600&width=800',
    '/placeholder.svg?height=600&width=800',
    '/placeholder.svg?height=600&width=800',
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const sectionRefs = {
    info: useRef<HTMLElement>(null),
    photoPlayer: useRef<HTMLElement>(null),
    details: useRef<HTMLElement>(null),
    video: useRef<HTMLElement>(null),
    gallery: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
    map: useRef<HTMLElement>(null),
  }

  type SectionName = keyof typeof sectionRefs;

  const scrollToSection = (sectionName: SectionName) => {
    sectionRefs[sectionName].current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="font-sans bg-black text-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-black bg-opacity-50' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex justify-between py-4 overflow-x-auto">
            {Object.keys(sectionRefs).map((section) => (
              <li key={section} className="flex-shrink-0">
                <button
                  onClick={() => scrollToSection(section as SectionName)}
                  className="text-white hover:text-gray-300 capitalize px-2"
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <header className="relative bg-cover bg-center mb-8" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')", backgroundColor: 'rgba(0,0,0,0.5)', backgroundBlendMode: 'overlay'}}>
        <div className="bg-black bg-opacity-50 p-4 pt-20">
          <h1 className="text-4xl font-bold text-white ml-20">
            15315 Santella Court Rancho Peñasquitos, San Diego, CA
          </h1>
        </div>
        <div className="h-screen flex flex-col justify-between">
          <div className="w-full flex justify-end p-4">
            <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden invisible">
              <img src="/placeholder.svg?height=128&width=128" alt="Property" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full flex justify-between items-end p-4">
            <div className="flex items-center bg-black bg-opacity-50 p-4 rounded-lg ml-20">
              <img src="/placeholder.svg?height=100&width=100" alt="Agent" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h3 className="text-white font-bold">John Doe</h3>
                <p className="text-white">Real Estate Agent</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button aria-label="Share on Facebook" className="text-white hover:text-blue-500">
                <Facebook />
              </button>
              <button aria-label="Share on Twitter" className="text-white hover:text-blue-400">
                <Twitter />
              </button>
              <button aria-label="Share on Instagram" className="text-white hover:text-pink-500">
                <Instagram />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8" style={{backgroundColor: 'rgb(0, 51, 153)'}}>
        <section ref={sectionRefs.info} className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Property Information</h2>
          <p className="text-xl text-gray-300">
            Welcome to this stunning 4 bedroom, 3 bathroom home in the highly desirable Rancho
            Peñasquitos neighborhood. This beautifully maintained property offers a spacious floor
            plan, updated kitchen, and a large backyard perfect for entertaining.
          </p>
        </section>

        <section ref={sectionRefs.photoPlayer} className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Photo Player</h2>
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt={`Property image ${currentImageIndex + 1}`}
              className="w-full h-[300px] md:h-[600px] object-cover rounded-lg"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        <section ref={sectionRefs.details} className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-2">$1,599,000</h3>
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>15315 Santella Court, Rancho Peñasquitos, San Diego, CA 92129</span>
              </div>
              <div className="flex flex-wrap space-x-4 mb-4">
                <div className="flex items-center">
                  <Bed className="w-5 h-5 mr-2" />
                  <span>4 beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-5 h-5 mr-2" />
                  <span>3 baths</span>
                </div>
                <div className="flex items-center">
                  <Ruler className="w-5 h-5 mr-2" />
                  <span>2,553 sqft</span>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">Features</h4>
              <ul className="list-disc list-inside mb-4">
                <li>Updated kitchen with stainless steel appliances</li>
                <li>Large master suite with walk-in closet</li>
                <li>Spacious backyard with patio area</li>
                <li>Two-car garage</li>
                <li>Close to excellent schools and shopping</li>
              </ul>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.video} className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Property Video</h2>
          <div className="aspect-w-16 aspect-h-9">
            <div className="w-full h-0 pb-[56.25%] relative">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Video placeholder</span>
              </div>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.gallery} className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Photo Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <img
                key={i}
                src={`/placeholder.svg?height=300&width=400&text=Gallery+Image+${i}`}
                alt={`Gallery image ${i}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </section>

        <section ref={sectionRefs.contact} className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Agent</h2>
          <div className="p-6 rounded-lg">
            <form onSubmit={(e) => {
              e.preventDefault();
              console.log('Form submitted');
              // Add your form submission logic here
            }} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full p-2 border border-gray-300 rounded text-black"
              ></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </section>

        <section ref={sectionRefs.map} className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Location</h2>
          <div className="bg-gray-800 h-[400px] rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Map placeholder</span>
          </div>
        </section>
      </main>
    </div>
  )
}
