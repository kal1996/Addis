"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  MapPin,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  supplier: string;
  location: string;
  rating: number;
  orders: number;
  verified: boolean;
  stock: string;
  minimum: number;
  delivery: string;
  description: string;
  artwork: "cement" | "steel" | "sand" | "blocks" | "roofing" | "aggregate";
  specifications: { label: string; value: string }[];
};

const products: Product[] = [
  {
    id: 1,
    name: "Portland Cement",
    category: "Cement",
    price: 1250,
    unit: "quintal",
    supplier: "Ethio Cement Supply",
    location: "Addis Ababa, Ethiopia",
    rating: 4.8,
    orders: 248,
    verified: true,
    stock: "In stock",
    minimum: 10,
    delivery: "2–4 business days",
    description:
      "Portland cement for general construction work, including foundations, masonry, and concrete applications. Confirm the cement grade, packaging, availability, and final price with the supplier.",
    artwork: "cement",
    specifications: [
      { label: "Category", value: "Cement" },
      { label: "Unit", value: "Quintal (100 kg)" },
      { label: "Minimum order", value: "10 quintals" },
      { label: "Supplier verification", value: "Verified" },
    ],
  },
  {
    id: 2,
    name: "Reinforcement Steel",
    category: "Steel & Metal",
    price: 9800,
    unit: "quintal",
    supplier: "Abyssinia Steel Trading",
    location: "Akaki, Addis Ababa",
    rating: 4.7,
    orders: 186,
    verified: true,
    stock: "In stock",
    minimum: 5,
    delivery: "3–5 business days",
    description:
      "Reinforcement steel for concrete structures and construction projects. Confirm the bar diameter, steel grade, length, and quality documentation before purchasing.",
    artwork: "steel",
    specifications: [
      { label: "Category", value: "Steel & Metal" },
      { label: "Unit", value: "Quintal (100 kg)" },
      { label: "Minimum order", value: "5 quintals" },
      { label: "Supplier verification", value: "Verified" },
    ],
  },
  {
    id: 3,
    name: "Washed Construction Sand",
    category: "Sand & Gravel",
    price: 4200,
    unit: "m³",
    supplier: "Blue Nile Aggregates",
    location: "Bole, Addis Ababa",
    rating: 4.5,
    orders: 124,
    verified: true,
    stock: "In stock",
    minimum: 5,
    delivery: "1–3 business days",
    description:
      "Construction sand for suitable building applications. Confirm grading, cleanliness, quantity, and delivery access with the supplier before ordering.",
    artwork: "sand",
    specifications: [
      { label: "Category", value: "Sand & Gravel" },
      { label: "Unit", value: "Cubic metre (m³)" },
      { label: "Minimum order", value: "5 m³" },
      { label: "Supplier verification", value: "Verified" },
    ],
  },
  {
    id: 4,
    name: "Concrete Blocks",
    category: "Concrete Blocks",
    price: 85,
    unit: "piece",
    supplier: "Habesha Block Works",
    location: "Sululta, Oromia",
    rating: 4.3,
    orders: 72,
    verified: false,
    stock: "Check availability",
    minimum: 100,
    delivery: "3–6 business days",
    description:
      "Concrete blocks for building and partition applications. Confirm dimensions, strength requirements, quantity, and transportation arrangements.",
    artwork: "blocks",
    specifications: [
      { label: "Category", value: "Concrete Blocks" },
      { label: "Unit", value: "Piece" },
      { label: "Minimum order", value: "100 pieces" },
      { label: "Supplier verification", value: "Pending" },
    ],
  },
  {
    id: 5,
    name: "Corrugated Roofing Sheets",
    category: "Roofing",
    price: 1450,
    unit: "sheet",
    supplier: "Abyssinia Steel Trading",
    location: "Akaki, Addis Ababa",
    rating: 4.7,
    orders: 186,
    verified: true,
    stock: "In stock",
    minimum: 20,
    delivery: "3–5 business days",
    description:
      "Corrugated roofing sheets for building projects. Confirm sheet thickness, dimensions, coating, color, and availability with the supplier.",
    artwork: "roofing",
    specifications: [
      { label: "Category", value: "Roofing" },
      { label: "Unit", value: "Sheet" },
      { label: "Minimum order", value: "20 sheets" },
      { label: "Supplier verification", value: "Verified" },
    ],
  },
  {
    id: 6,
    name: "Crushed Stone Aggregate",
    category: "Sand & Gravel",
    price: 3600,
    unit: "m³",
    supplier: "Blue Nile Aggregates",
    location: "Bole, Addis Ababa",
    rating: 4.5,
    orders: 124,
    verified: true,
    stock: "In stock",
    minimum: 5,
    delivery: "1–3 business days",
    description:
      "Crushed stone aggregate for suitable concrete and construction applications. Confirm aggregate size, grading, quantity, and delivery costs.",
    artwork: "aggregate",
    specifications: [
      { label: "Category", value: "Sand & Gravel" },
      { label: "Unit", value: "Cubic metre (m³)" },
      { label: "Minimum order", value: "5 m³" },
      { label: "Supplier verification", value: "Verified" },
    ],
  },
];

function ProductArtwork({
  type,
}: {
  type: Product["artwork"];
}) {
  const colors: Record<Product["artwork"], string> = {
    cement: "#e2e8f0",
    steel: "#dbe4ee",
    sand: "#eadfc9",
    blocks: "#e1e5e9",
    roofing: "#dbe7e3",
    aggregate: "#dedfe3",
  };

  return (
    <div
      className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl"
      style={{ backgroundColor: colors[type] }}
    >
      {type === "cement" && (
        <svg viewBox="0 0 300 220" className="h-64 w-full max-w-sm">
          <ellipse cx="150" cy="185" rx="80" ry="10" fill="#64748b" opacity=".25" />
          <path d="M91 62 L190 62 L205 80 L205 174 L91 174 Z" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          <path d="M91 62 L107 46 L205 46 L190 62 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
          <text x="148" y="119" textAnchor="middle" fontSize="15" fontWeight="700" fill="#183047">CEMENT</text>
          <text x="148" y="139" textAnchor="middle" fontSize="10" fill="#64748b">CONSTRUCTION</text>
        </svg>
      )}

      {type === "steel" && (
        <svg viewBox="0 0 300 220" className="h-64 w-full max-w-sm">
          <ellipse cx="150" cy="185" rx="100" ry="10" fill="#64748b" opacity=".25" />
          {[0, 1, 2, 3, 4].map((n) => (
            <g key={n} transform={`translate(${55 + n * 38} 60) rotate(-15)`}>
              <rect width="13" height="115" rx="4" fill="#64748b" stroke="#475569" strokeWidth="2" />
              {Array.from({ length: 8 }).map((_, i) => (
                <path key={i} d={`M0 ${12 + i * 12} L13 ${5 + i * 12}`} stroke="#cbd5e1" strokeWidth="3" />
              ))}
            </g>
          ))}
        </svg>
      )}

      {type === "sand" && (
        <svg viewBox="0 0 300 220" className="h-64 w-full max-w-sm">
          <path d="M40 165 Q70 90 120 125 Q170 65 220 120 Q250 120 265 165 Z" fill="#c4a574" />
          {Array.from({ length: 65 }).map((_, i) => (
            <circle
              key={i}
              cx={48 + ((i * 37) % 205)}
              cy={112 + ((i * 19) % 52)}
              r={1.5 + (i % 3)}
              fill={i % 2 ? "#a78b60" : "#ead7b2"}
            />
          ))}
        </svg>
      )}

      {type === "blocks" && (
        <svg viewBox="0 0 300 220" className="h-64 w-full max-w-sm">
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <g key={`${row}-${col}`} transform={`translate(${45 + col * 72 + (row % 2) * 15} ${48 + row * 42})`}>
                <rect width="68" height="36" rx="3" fill="#bfc7d0" stroke="#737e8a" strokeWidth="2" />
                <rect x="8" y="8" width="20" height="19" rx="2" fill="#858f9a" />
                <rect x="40" y="8" width="20" height="19" rx="2" fill="#858f9a" />
              </g>
            ))
          )}
        </svg>
      )}

      {type === "roofing" && (
        <svg viewBox="0 0 300 220" className="h-64 w-full max-w-sm">
          <path d="M55 145 L85 55 L245 85 L215 172 Z" fill="#718b85" stroke="#48645d" strokeWidth="2" />
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={i} d={`M${80 + i * 24} ${75 + i * 4} L${55 + i * 24} ${150 + i * 3}`} stroke="#dce8e3" strokeWidth="4" />
          ))}
        </svg>
      )}

      {type === "aggregate" && (
        <svg viewBox="0 0 300 220" className="h-64 w-full max-w-sm">
          {Array.from({ length: 40 }).map((_, i) => {
            const x = 40 + ((i * 43) % 220);
            const y = 65 + ((i * 29) % 110);
            const size = 7 + (i % 8);

            return (
              <polygon
                key={i}
                points={`${x},${y - size} ${x + size},${y - size / 3} ${x + size / 2},${y + size} ${x - size / 2},${y + size} ${x - size},${y}`}
                fill={["#7b818a", "#a3aab3", "#626b75", "#c1c6cc"][i % 4]}
                stroke="#717780"
                strokeWidth="1"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const productId = Number(id);

  const product = products.find((item) => item.id === productId);

  const [quantity, setQuantity] = useState(product?.minimum ?? 1);
  const [quoteRequested, setQuoteRequested] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-slate-400" />
          <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            This product does not exist in the current demo catalog.
          </p>
          <Button
           render={<Link href="/products" />}
            className="mt-6 bg-emerald-700 hover:bg-emerald-800">
             Back to marketplace
          </Button>
        </div>
      </main>
    );
  }

  const subtotal = product.price * quantity;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <Package className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">
              Addis<span className="text-emerald-700">Link</span>
            </span>
          </Link>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700">
            <ArrowLeft className="h-4 w-4" />
            Marketplace
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Dashboard</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-emerald-700">Products</Link>
          <span>/</span>
          <span className="font-medium text-slate-800">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section>
            <ProductArtwork type={product.artwork} />

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <ShieldCheck className="mb-2 h-5 w-5 text-emerald-700" />
                <p className="text-xs font-semibold">Supplier trust</p>
                <p className="mt-1 text-xs text-slate-500">{product.verified ? "Verified supplier" : "Verification pending"}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <Truck className="mb-2 h-5 w-5 text-emerald-700" />
                <p className="text-xs font-semibold">Delivery</p>
                <p className="mt-1 text-xs text-slate-500">{product.delivery}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <CheckCircle2 className="mb-2 h-5 w-5 text-emerald-700" />
                <p className="text-xs font-semibold">Order tracking</p>
                <p className="mt-1 text-xs text-slate-500">On AddisLink</p>
              </div>
            </div>

            <Card className="mt-6 gap-4 rounded-2xl border-slate-200 p-6 shadow-none">
              <h2 className="text-lg font-bold">Product description</h2>
              <p className="text-sm leading-7 text-slate-600">{product.description}</p>
              <div className="mt-2 divide-y divide-slate-100">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <span className="text-slate-500">{spec.label}</span>
                    <span className="text-right font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-5">
            <div>
              <Badge variant="secondary" className="mb-3 bg-emerald-50 text-emerald-800">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="font-semibold text-amber-600">★ {product.rating.toFixed(1)}</span>
                <span>{product.orders} previous orders</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{product.location}</span>
              </div>
            </div>

            <Card className="gap-5 rounded-2xl border-slate-200 p-6 shadow-none">
              <div>
                <p className="text-sm text-slate-500">Indicative price</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl font-bold">ETB {product.price.toLocaleString("en-ET")}</span>
                  <span className="text-sm text-slate-500">/ {product.unit}</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">Demo price only. Confirm the final quote with the supplier.</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Supplier</span>
                  <span className="text-right text-sm font-semibold">{product.supplier}</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Status</span>
                  {product.verified ? (
                    <Badge className="gap-1 bg-emerald-100 text-emerald-800"><BadgeCheck className="h-3.5 w-3.5" />Verified</Badge>
                  ) : (
                    <Badge variant="secondary">Pending verification</Badge>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Availability</span>
                  <span className="text-sm font-medium">{product.stock}</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Estimated delivery</span>
                  <span className="flex items-center gap-1 text-right text-sm font-medium"><Clock3 className="h-4 w-4" />{product.delivery}</span>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <label className="text-sm font-semibold">Quantity</label>
                  <span className="text-xs text-slate-500">Minimum: {product.minimum} {product.unit}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Button type="button" variant="outline" size="icon" aria-label="Decrease quantity" disabled={quantity <= product.minimum} onClick={() => setQuantity((current) => Math.max(product.minimum, current - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-center font-semibold">{quantity}</div>
                  <Button type="button" variant="outline" size="icon" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-sm text-slate-500">Estimated subtotal</span>
                <span className="text-xl font-bold">ETB {subtotal.toLocaleString("en-ET")}</span>
              </div>

              <Button type="button" className="w-full bg-emerald-700 hover:bg-emerald-800" onClick={() => setQuoteRequested(true)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Request supplier quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {quoteRequested && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                    <div>
                      <p className="font-semibold text-emerald-900">Quote request preview</p>
                      <p className="mt-1 text-sm leading-6 text-emerald-800">
                        Demo request prepared for {product.supplier}: {quantity} {product.unit} of {product.name}, estimated at ETB {subtotal.toLocaleString("en-ET")}.
                      </p>
                      <p className="mt-2 text-xs text-emerald-700">This is a prototype preview. No request has been sent to a real supplier.</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-center text-xs leading-5 text-slate-500">
                Confirm final pricing, transportation costs, specifications, and delivery dates with the supplier.
              </p>
            </Card>

            <Card className="gap-3 rounded-2xl border-slate-200 p-5 shadow-none">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                <div>
                  <h3 className="font-semibold">Trade with confidence</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    AddisLink helps buyers review supplier verification and manage construction-material transactions.
                  </p>
                </div>
              </div>
            </Card>

            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-900">
              <ArrowLeft className="h-4 w-4" />
              Browse more products
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}