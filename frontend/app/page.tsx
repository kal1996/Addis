"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  HardHat,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  {
    name: "Construction Materials",
    description: "Cement, blocks, sand, aggregates and more.",
    icon: Building2,
  },
  {
    name: "Steel & Metal",
    description: "Reinforcement bars, steel products and metal supplies.",
    icon: HardHat,
  },
  {
    name: "Tools & Equipment",
    description: "Tools, machinery and essential site equipment.",
    icon: Package,
  },
  {
    name: "Transport & Logistics",
    description: "Delivery services and construction logistics.",
    icon: Truck,
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Verified suppliers",
    description:
      "Help buyers identify suppliers whose business information has been reviewed.",
  },
  {
    icon: ClipboardCheck,
    title: "Organized transactions",
    description:
      "Keep product inquiries, quotations and purchasing details organized.",
  },
  {
    icon: Users,
    title: "Business connections",
    description:
      "Bring construction companies, contractors and material suppliers together.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Register as a buyer or supplier and set up your business profile.",
  },
  {
    number: "02",
    title: "Find the right supplier",
    description:
      "Explore products and review available supplier information.",
  },
  {
    number: "03",
    title: "Connect and manage",
    description:
      "Contact suppliers and keep purchasing inquiries organized.",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchTerm.trim();
    const destination = query
      ? `/products?search=${encodeURIComponent(query)}`
      : "/products";

    window.location.href = destination;
  }

  function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(
      contactSubject.trim() || "AddisLink website inquiry",
    );

    const body = encodeURIComponent(
      `Name: ${contactName}\nEmail: ${contactEmail}\n\n${contactMessage}`,
    );

    // Opens the visitor's email application.
    // Replace this with a backend API when email submission is implemented.
    window.location.href = `mailto:contact@addislink.com?subject=${subject}&body=${body}`;

    setContactStatus(
      "Your email application should open with your message prepared. If it does not, contact us using your email application.",
    );
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
              <Building2 size={23} />
            </span>

            <span>
              <span className="block text-xl font-extrabold tracking-tight">
                Addis<span className="text-teal-700">Link</span>
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.17em] text-slate-500 sm:block">
                Construction Business Network
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-teal-700"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              Products
            </Link>
            <Link
              href="/suppliers"
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              Suppliers
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              How it works
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              Contact
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              Get started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/suppliers", label: "Suppliers" },
                { href: "/#how-it-works", label: "How it works" },
                { href: "/#contact", label: "Contact" },
                { href: "/login", label: "Log in" },
                { href: "/register", label: "Get started" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.30),transparent_50%)]" />
        <div className="absolute -right-24 top-20 -z-10 h-80 w-80 rounded-full bg-teal-600/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-200">
              <BadgeCheck size={17} />
              Built for Ethiopia&apos;s construction industry
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build better connections.
              <span className="mt-2 block text-teal-400">
                Build with confidence.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              AddisLink connects construction businesses with material
              suppliers through a more organized, transparent and reliable
              B2B marketplace.
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-2xl shadow-black/20 sm:flex-row"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search className="shrink-0 text-slate-400" size={21} />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search cement, steel, equipment..."
                  aria-label="Search construction products"
                  className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
              <Button
                type="submit"
                className="h-11 bg-teal-700 px-6 text-white hover:bg-teal-800"
              >
                Find products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-400" />
                Supplier discovery
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-400" />
                Business-focused
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-teal-400" />
                Organized inquiries
              </span>
            </div>
          </div>

          {/* Marketplace preview */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-teal-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white p-5 shadow-2xl sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    AddisLink marketplace
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Your business, connected
                  </h2>
                </div>
                <span className="rounded-xl bg-teal-50 p-3 text-teal-700">
                  <ShoppingCart size={24} />
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                    <Building2 size={21} />
                  </span>
                  <p className="font-bold text-slate-900">Find suppliers</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Explore business profiles and products
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                    <ShieldCheck size={21} />
                  </span>
                  <p className="font-bold text-slate-900">Build trust</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Review available business information
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                    <Package size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">
                      Construction supplies
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Materials, tools and equipment
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-teal-50 p-4">
                <CheckCircle2 className="shrink-0 text-teal-700" size={22} />
                <p className="text-sm leading-6 text-teal-900">
                  Discover suppliers and organize business inquiries in one
                  place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust features */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="shrink-0 text-teal-700" size={25} />
            <div>
              <p className="font-semibold text-slate-900">
                Trust-oriented discovery
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Review supplier information
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ClipboardCheck className="shrink-0 text-teal-700" size={25} />
            <div>
              <p className="font-semibold text-slate-900">
                Organized purchasing
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Keep inquiries in one place
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Building2 className="shrink-0 text-teal-700" size={25} />
            <div>
              <p className="font-semibold text-slate-900">
                Designed for B2B
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Focused on construction businesses
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
                Explore the marketplace
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Find what your project needs
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Explore construction purchasing categories and connect with
                businesses that supply the products and services you need.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900"
            >
              Browse products <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg hover:shadow-slate-200/60"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-800 transition group-hover:bg-teal-700 group-hover:text-white">
                    <Icon size={24} />
                  </span>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {category.name}
                  </h3>
                  <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 group-hover:text-teal-700">
                    Explore category
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
              Why AddisLink?
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Better visibility. Better connections.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              A business-focused platform designed to make supplier discovery
              and purchasing communication more manageable.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 p-7 transition hover:border-teal-200 hover:shadow-lg hover:shadow-slate-100"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-800">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
              Simple process
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              How AddisLink works
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Start with a business profile, find suitable suppliers and manage
              your inquiries through a clear workflow.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number}>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-100 bg-white text-lg font-extrabold text-teal-800 shadow-sm">
                  {step.number}
                </span>
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-teal-800 px-6 py-12 sm:px-12 sm:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-200">
                Start building connections
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Bring your construction business closer to the right suppliers.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-teal-100">
                Create an account to explore the AddisLink business network.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-bold text-teal-900 transition hover:bg-teal-50"
              >
                Create an account <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/suppliers"
                className="inline-flex h-12 items-center justify-center rounded-md border border-teal-200 px-6 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Explore suppliers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
              Get in touch
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Contact the AddisLink team
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-600">
              Have a question about registering your business, finding
              suppliers or using the platform? Send us a message.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                  <Mail size={21} />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">Email</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Use the contact form to prepare an email for our team.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                  <MapPin size={21} />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">Location</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Ethiopia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                  <Phone size={21} />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">Business inquiries</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Contact us about supplier registration and platform support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-xl font-bold text-slate-900">
              Send us a message
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Complete the form to prepare a message in your email application.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>
                <Input
                  id="contact-name"
                  value={contactName}
                  onChange={(event) => setContactName(event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className="h-11"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(event) => setContactEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-11"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>
                <Input
                  id="contact-subject"
                  value={contactSubject}
                  onChange={(event) => setContactSubject(event.target.value)}
                  placeholder="How can we help?"
                  required
                  className="h-11"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={contactMessage}
                  onChange={(event) => setContactMessage(event.target.value)}
                  placeholder="Write your message here..."
                  required
                  rows={5}
                  className="w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-600/20"
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
              >
                Prepare email <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {contactStatus && (
                <p
                  role="status"
                  className="rounded-lg bg-teal-50 p-3 text-sm leading-6 text-teal-900"
                >
                  {contactStatus}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
                <Building2 size={20} />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Addis<span className="text-teal-700">Link</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Connecting Ethiopia&apos;s construction businesses with a more
              organized way to discover suppliers and manage purchasing
              inquiries.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:justify-self-end sm:gap-16">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Marketplace
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <Link className="hover:text-teal-700" href="/products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-teal-700" href="/suppliers">
                    Suppliers
                  </Link>
                </li>
                <li>
                  <a
                    className="hover:text-teal-700"
                    href="#how-it-works"
                  >
                    How it works
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">Your account</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <Link className="hover:text-teal-700" href="/login">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-teal-700" href="/register">
                    Register
                  </Link>
                </li>
                <li>
                  <a className="hover:text-teal-700" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>
              © 2026 <span className="font-bold text-slate-700">AddisLink</span>.
              All rights reserved.
            </p>
            <p>Built to connect construction businesses in Ethiopia.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
