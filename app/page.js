"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { Sprout, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Calendar, BarChart2, Globe, Clock } from "lucide-react";
import Image from "next/image";



// Header component
function Header() {
  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Sprout className="h-8 w-8 text-green-600" />
          <span className="text-xl font-bold text-gray-800">SocialSprout</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="#features" className="text-gray-600 hover:text-gray-800">
            Features
          </Link>
          <Link href="#faq" className="text-gray-600 hover:text-gray-800">
            FAQ
          </Link>
          {/* <Link href="#" className="text-gray-600 hover:text-gray-800">
            Pricing
          </Link> */}
        </nav>
        <div className="flex space-x-2">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}

// Hero component
function Hero() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="flex container mx-auto px-6 text-center">
        <div className="flex flex-col justify-center items-center m-7 h-109">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Manage Your Social Media with Ease
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Schedule, publish, and analyze your content across multiple
              platforms from one dashboard.
            </p>
            <Button size="lg" className="mb-8">
              Get Started
            </Button>
          </div>
        </div>
        <div className="m-7">
          <Image
            src="/landing.jpeg"
            alt="SocialSprout Dashboard"
            width={800}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

// Features component
const features = [
  {
    icon: <Calendar className="h-6 w-6 text-green-600" />,
    title: "Content Calendar",
    description:
      "Plan and schedule your content across multiple platforms with our intuitive calendar interface.",
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-green-600" />,
    title: "Analytics",
    description:
      "Get in-depth insights into your social media performance with our comprehensive analytics tools.",
  },
  {
    icon: <Globe className="h-6 w-6 text-green-600" />,
    title: "Multi-Platform Support",
    description:
      "Manage all your social media accounts from one centralized dashboard.",
  },
  {
    icon: <Clock className="h-6 w-6 text-green-600" />,
    title: "Auto-Scheduling",
    description:
      "Let our AI determine the best times to post for maximum engagement.",
  },
];

function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Features That Empower Your Social Media Strategy
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ component
const faqs = [
  {
    question: "What platforms does SocialSprout support?",
    answer:
      "SocialSprout supports all major social media platforms including Facebook, Twitter, Instagram, LinkedIn, and Pinterest.",
  },
  {
    question: "Can I schedule posts in advance?",
    answer:
      "Yes, you can schedule posts weeks or even months in advance using our content calendar feature.",
  },
  {
    question: "Is there a limit to how many social accounts I can manage?",
    answer:
      "The number of accounts you can manage depends on your subscription plan. Our higher-tier plans allow for unlimited social accounts.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a 14-day free trial so you can experience all the features SocialSprout has to offer before committing to a paid plan.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="w-full max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <div className="bg-green-100 p-4 rounded-md mb-2">
                <h3 className="text-l font-semibold text-gray-800">
                  {faq.question}
                </h3>
              </div>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA component
function CTA() {
  return (
    <section className="py-20 bg-green-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Supercharge Your Social Media?
        </h2>
        <p className="text-xl mb-8">
          Join thousands of marketers and content creators who trust
          SocialSprout.
        </p>
        <Button size="lg" variant="secondary" >
          Get started
        </Button>
      </div>
    </section>
  );
}

// ScrollToTop component
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      className="fixed bottom-4 right-4 rounded-full p-2"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Sprout className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold">SocialSprout</span>
            </Link>
            <p className="text-gray-400">
              Empowering your social media strategy.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Features
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </li> */}
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  API Docs
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} SocialSprout. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Home page component
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}