import { useState, useCallback } from 'react'
import Splash from './components/Splash'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import TheShift from './components/TheShift'
import ProductDemo from './components/ProductDemo'
import HowItWorks from './components/HowItWorks'
import Safety from './components/Safety'
import Testimonials from './components/Testimonials'
import Features from './components/Features'
import Lifecycle from './components/Lifecycle'
import Pricing from './components/Pricing'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const handleSplashComplete = useCallback(() => setSplashDone(true), [])

  return (
    <div className="min-h-screen bg-surface">
      <Splash onComplete={handleSplashComplete} />
      <div style={{ opacity: splashDone ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Navbar />
        <Hero />
        <Problem />
        <TheShift />
        <ProductDemo />
        <HowItWorks />
        <Safety />
        <Testimonials />
        <Features />
        <Lifecycle />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  )
}
