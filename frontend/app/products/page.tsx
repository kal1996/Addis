

"use client";



import { useMemo, useState } from "react";
import Link from "next/link";

import {

  Search,

  ShoppingCart,

  Package,

  SlidersHorizontal,

  MapPin,

  BadgeCheck,

  Plus,

  Minus,

  X,

  Boxes,

  ArrowRight,

} from "lucide-react";



import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {

  Card,

  CardContent,

} from "@/components/ui/card";

import { Input } from "@/components/ui/input";



type Product = {

  id: number;

  name: string;

  category: string;

  price: number;

  unit: string;

  supplier: string;

  location: string;

  verified: boolean;

  stock: string;

  color: string;

  image: string;

};



const products: Product[] = [

  {

    id: 1,

    name: "Portland Cement",

    category: "Cement",

    price: 950,

    unit: "quintal",

    supplier: "Ethio Cement Supply",

    location: "Addis Ababa",

    verified: true,

    stock: "In stock",

    color: "bg-stone-100",

    image: "cement",

  },

  {

    id: 2,

    name: "Reinforcement Steel",

    category: "Steel",

    price: 125,

    unit: "kg",

    supplier: "Abyssinia Steel Trading",

    location: "Akaki, Addis Ababa",

    verified: true,

    stock: "In stock",

    color: "bg-slate-100",

    image: "steel",

  },

  {

    id: 3,

    name: "Washed Construction Sand",

    category: "Sand & Gravel",

    price: 4200,

    unit: "m³",

    supplier: "Blue Nile Aggregates",

    location: "Bole, Addis Ababa",

    verified: true,

    stock: "Limited stock",

    color: "bg-amber-50",

    image: "sand",

  },

  {

    id: 4,

    name: "Hollow Concrete Blocks",

    category: "Blocks",

    price: 85,

    unit: "piece",

    supplier: "Habesha Block Works",

    location: "Sululta, Oromia",

    verified: false,

    stock: "In stock",

    color: "bg-zinc-100",

    image: "blocks",

  },

  {

    id: 5,

    name: "Roofing Sheets",

    category: "Roofing",

    price: 780,

    unit: "sheet",

    supplier: "Abyssinia Steel Trading",

    location: "Akaki, Addis Ababa",

    verified: true,

    stock: "In stock",

    color: "bg-blue-50",

    image: "roofing",

  },

  {

    id: 6,

    name: "Crushed Aggregate",

    category: "Sand & Gravel",

    price: 3600,

    unit: "m³",

    supplier: "Blue Nile Aggregates",

    location: "Bole, Addis Ababa",

    verified: true,

    stock: "In stock",

    color: "bg-orange-50",

    image: "aggregate",

  },

];



const categories = [

  "All Materials",

  "Cement",

  "Steel",

  "Sand & Gravel",

  "Blocks",

  "Roofing",

];



const money = (amount: number) =>

  `ETB ${amount.toLocaleString("en-US")}`;



function ProductIllustration({ image }: { image: string }) {

  const common = {

    className: "h-28 w-28 object-contain transition-transform duration-300 group-hover:scale-105",

    viewBox: "0 0 160 130",

    fill: "none",

    xmlns: "http://www.w3.org/2000/svg",

  };



  if (image === "cement") {

    return (

      <svg {...common}>

        <path d="M35 35 L105 25 L127 40 L127 103 L48 112 L35 96 Z" fill="#D8C7A5" stroke="#9C8968" strokeWidth="2" />

        <path d="M35 35 L105 25 L127 40 L55 50 Z" fill="#E8D8B9" stroke="#9C8968" strokeWidth="2" />

        <path d="M55 50 L127 40 L127 103 L55 112 Z" fill="#C5B28F" stroke="#9C8968" strokeWidth="2" />

        <text x="83" y="73" fontSize="13" textAnchor="middle" fill="#374151" fontWeight="bold">CEMENT</text>

        <path d="M67 81 L99 77" stroke="#6B7280" strokeWidth="2" />

      </svg>

    );

  }



  if (image === "steel") {

    return (

      <svg {...common}>

        {[0, 1, 2, 3, 4].map((i) => (

          <g key={i} transform={`translate(${20 + i * 22} ${18 + i * 3}) rotate(-8)`}>

            <rect x="0" y="0" width="9" height="91" rx="4" fill="#64748B" stroke="#334155" strokeWidth="1.5" />

            {Array.from({ length: 8 }).map((_, j) => (

              <path key={j} d={`M0 ${10 + j * 10} L9 ${4 + j * 10}`} stroke="#CBD5E1" strokeWidth="2" />

            ))}

          </g>

        ))}

      </svg>

    );

  }



  if (image === "sand" || image === "aggregate") {

    return (

      <svg {...common}>

        <path d="M16 96 Q35 69 59 82 Q83 53 108 78 Q129 72 145 96 L140 108 L22 108 Z" fill={image === "sand" ? "#D6B878" : "#929292"} />

        <path d="M24 92 Q45 65 67 82 Q91 62 126 91" stroke={image === "sand" ? "#B8914D" : "#666666"} strokeWidth="2" />

        {Array.from({ length: 26 }).map((_, i) => (

          <circle key={i} cx={25 + ((i * 31) % 110)} cy={72 + ((i * 17) % 30)} r={2 + (i % 3)} fill={image === "sand" ? "#BFA166" : "#777777"} />

        ))}

      </svg>

    );

  }



  if (image === "blocks") {

    return (

      <svg {...common}>

        {[0, 1, 2].map((row) =>

          [0, 1].map((col) => (

            <g key={`${row}-${col}`} transform={`translate(${22 + col * 57 + (row % 2) * 10} ${28 + row * 27})`}>

              <rect width="54" height="24" rx="2" fill="#C6C9CB" stroke="#777E84" strokeWidth="1.5" />

              <rect x="7" y="5" width="14" height="14" rx="2" fill="#F4F4F4" stroke="#9CA3AF" />

              <rect x="32" y="5" width="14" height="14" rx="2" fill="#F4F4F4" stroke="#9CA3AF" />

            </g>

          ))

        )}

      </svg>

    );

  }



  return (

    <svg {...common}>

      {[0, 1, 2].map((i) => (

        <path key={i} d={`M${24 + i * 8} ${40 + i * 10} L${112 + i * 5} ${20 + i * 10} L${139 + i * 3} ${85 + i * 5} L${51 + i * 4} ${105 + i * 3} Z`} fill={["#64748B", "#94A3B8", "#CBD5E1"][i]} stroke="#475569" strokeWidth="1.5" />

      ))}

    </svg>

  );

}



export default function ProductsPage() {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All Materials");

  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const [cart, setCart] = useState<Record<number, number>>({});

  const [cartOpen, setCartOpen] = useState(false);



  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const matchesSearch = [

        product.name,

        product.category,

        product.supplier,

        product.location,

      ]

        .join(" ")

        .toLowerCase()

        .includes(search.toLowerCase());



      const matchesCategory =

        category === "All Materials" || product.category === category;



      const matchesVerification = !verifiedOnly || product.verified;



      return matchesSearch && matchesCategory && matchesVerification;

    });

  }, [search, category, verifiedOnly]);



  const cartCount = Object.values(cart).reduce(

    (total, quantity) => total + quantity,

    0

  );



  const cartTotal = products.reduce(

    (total, product) => total + product.price * (cart[product.id] || 0),

    0

  );



  function changeQuantity(id: number, change: number) {

    setCart((current) => {

      const nextQuantity = (current[id] || 0) + change;

      const next = { ...current };



      if (nextQuantity <= 0) {

        delete next[id];

      } else {

        next[id] = nextQuantity;

      }



      return next;

    });

  }



  return (

    <main className="min-h-screen bg-[#F7F9FC] text-slate-900">

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <a href="/" className="flex shrink-0 items-center gap-2.5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">

              <Boxes size={22} />

            </div>

            <div>

              <p className="text-xl font-extrabold tracking-tight">

                Addis<span className="text-emerald-600">Link</span>

              </p>

              <p className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">

                Construction marketplace

              </p>

            </div>

          </a>



          <a

            href="/suppliers"

            className="hidden text-sm font-medium text-slate-600 transition hover:text-emerald-700 sm:block"

          >

            Find Suppliers

          </a>



          <Button

            className="relative bg-emerald-600 text-white hover:bg-emerald-700"

            onClick={() => setCartOpen(true)}

          >

            <ShoppingCart size={17} />

            <span className="hidden sm:inline">My Cart</span>

            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">

              {cartCount}

            </span>

          </Button>

        </div>

      </header>



      <section className="bg-[#102B46] text-white">

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-16 lg:px-8">

          <div>

            <Badge className="mb-5 border border-emerald-300/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/10">

              Ethiopia&apos;s construction marketplace

            </Badge>

            <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">

              Find the right materials.

              <span className="text-emerald-400"> Build with confidence.</span>

            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">

              Discover construction materials from suppliers across Ethiopia.

              Compare prices, check availability, and find verified businesses.

            </p>

            <div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-300">

              <span className="flex items-center gap-2">

                <BadgeCheck size={17} className="text-emerald-400" />

                Verified suppliers

              </span>

              <span className="flex items-center gap-2">

                <Package size={17} className="text-emerald-400" />

                Multiple material categories

              </span>

            </div>

          </div>



          <div className="relative hidden md:flex md:justify-end">

            <div className="absolute right-10 top-4 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative grid w-full max-w-sm grid-cols-2 gap-3">

              {[

                { icon: "cement", label: "Cement" },

                { icon: "steel", label: "Steel" },

                { icon: "sand", label: "Aggregates" },

                { icon: "blocks", label: "Concrete blocks" },

              ].map((item) => (

                <div

                  key={item.label}

                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur"

                >

                  <ProductIllustration image={item.icon} />

                  <span className="text-xs font-medium text-slate-200">

                    {item.label}

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>



      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-semibold text-emerald-700">

              MATERIAL DIRECTORY

            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">

              Explore construction materials

            </h2>

            <p className="mt-2 text-sm text-slate-500">

              Find supplies for your next project.

            </p>

          </div>

          <a

            href="/suppliers"

            className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"

          >

            Browse suppliers <ArrowRight size={16} />

          </a>

        </div>



        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto]">

          <div className="relative">

            <Search

              size={18}

              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"

            />

            <Input

              value={search}

              onChange={(event) => setSearch(event.target.value)}

              placeholder="Search materials, categories, or suppliers..."

              className="h-12 border-slate-200 bg-white pl-11"

              aria-label="Search products"

            />

          </div>

          <Button

            variant={verifiedOnly ? "default" : "outline"}

            onClick={() => setVerifiedOnly((value) => !value)}

            className={

              verifiedOnly

                ? "h-12 bg-emerald-600 text-white hover:bg-emerald-700"

                : "h-12 border-slate-200 bg-white"

            }

          >

            <SlidersHorizontal size={16} />

            Verified only

          </Button>

        </div>



        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">

          {categories.map((item) => (

            <button

              key={item}

              onClick={() => setCategory(item)}

              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${

                category === item

                  ? "bg-[#102B46] text-white"

                  : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"

              }`}

            >

              {item}

            </button>

          ))}

        </div>



        <div className="mb-4 flex items-center justify-between">

          <p className="text-sm text-slate-500">

            <span className="font-bold text-slate-900">

              {filteredProducts.length}

            </span>{" "}

            materials found

          </p>

          <span className="hidden items-center gap-1 text-xs text-slate-400 sm:flex">

            <MapPin size={14} /> Ethiopia

          </span>

        </div>



        {filteredProducts.length > 0 ? (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((product) => (

              <Card

                key={product.id}

                className="group overflow-hidden rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"

              >

                <div

                  className={`relative flex h-48 items-center justify-center ${product.color}`}

                >

                  <ProductIllustration image={product.image} />

                  <Badge

                    className={`absolute left-3 top-3 ${

                      product.verified

                        ? "border-emerald-200 bg-white text-emerald-700"

                        : "border-amber-200 bg-white text-amber-700"

                    }`}

                  >

                    {product.verified ? (

                      <BadgeCheck size={13} />

                    ) : (

                      <Package size={13} />

                    )}

                    {product.verified ? "Verified supplier" : "Verification pending"}

                  </Badge>

                  <span

                    className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${

                      product.stock === "In stock"

                        ? "bg-emerald-100 text-emerald-700"

                        : "bg-amber-100 text-amber-700"

                    }`}

                  >

                    {product.stock}

                  </span>

                </div>



                <CardContent className="p-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">

                    {product.category}

                  </p>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-1.5 block text-lg font-bold text-slate-900 transition hover:text-emerald-700"
                  >
                    <h3>{product.name}</h3>
                  </Link>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">

                    <MapPin size={14} />

                    {product.location}

                  </p>



                  <div className="mt-4 border-t border-slate-100 pt-4">

                    <p className="text-xs text-slate-500">Supplied by</p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700">

                      {product.supplier}

                      {product.verified && (

                        <BadgeCheck

                          size={15}

                          className="shrink-0 text-emerald-600"

                        />

                      )}

                    </p>

                  </div>



                  <div className="mt-5 flex items-end justify-between gap-3">

                    <div>

                      <p className="text-xs text-slate-500">Listed price</p>

                      <p className="mt-1 text-xl font-extrabold text-slate-900">

                        {money(product.price)}

                      </p>

                      <p className="text-xs text-slate-400">

                        per {product.unit}

                      </p>

                    </div>

                    <Button

                      onClick={() => changeQuantity(product.id, 1)}

                      className="bg-emerald-600 text-white hover:bg-emerald-700"

                    >

                      <Plus size={16} />

                      Add to cart

                    </Button>

                  </div>



                  {(cart[product.id] || 0) > 0 && (

                    <div className="mt-4 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">

                      <span className="text-xs font-medium text-emerald-800">

                        In your cart

                      </span>

                      <div className="flex items-center gap-3">

                        <button

                          onClick={() => changeQuantity(product.id, -1)}

                          className="rounded-md border border-emerald-200 bg-white p-1 text-emerald-700"

                          aria-label={`Remove one ${product.name}`}

                        >

                          <Minus size={14} />

                        </button>

                        <span className="min-w-4 text-center text-sm font-bold text-emerald-800">

                          {cart[product.id]}

                        </span>

                        <button

                          onClick={() => changeQuantity(product.id, 1)}

                          className="rounded-md border border-emerald-200 bg-white p-1 text-emerald-700"

                          aria-label={`Add one ${product.name}`}

                        >

                          <Plus size={14} />

                        </button>

                      </div>

                    </div>

                  )}

                </CardContent>

              </Card>

            ))}

          </div>

        ) : (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <Package className="mx-auto text-slate-300" size={40} />

            <h3 className="mt-4 font-bold text-slate-900">

              No materials found

            </h3>

            <p className="mt-2 text-sm text-slate-500">

              Try another search term or select a different category.

            </p>

            <Button

              variant="outline"

              className="mt-5"

              onClick={() => {

                setSearch("");

                setCategory("All Materials");

                setVerifiedOnly(false);

              }}

            >

              Clear filters

            </Button>

          </div>

        )}

      </section>



      <footer className="mt-10 border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

          <p>

            <span className="font-bold text-slate-800">AddisLink</span> — Building trust in Ethiopia&apos;s construction industry.

          </p>

          <a href="/" className="font-medium text-emerald-700 hover:underline">

            Back to dashboard

          </a>

        </div>

      </footer>



      {cartOpen && (

        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40">

          <button

            aria-label="Close cart overlay"

            className="absolute inset-0 cursor-default"

            onClick={() => setCartOpen(false)}

          />

          <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 p-5">

              <div>

                <h2 className="text-xl font-bold">Your cart</h2>

                <p className="mt-1 text-sm text-slate-500">

                  {cartCount} item{cartCount === 1 ? "" : "s"} selected

                </p>

              </div>

              <button

                onClick={() => setCartOpen(false)}

                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"

                aria-label="Close cart"

              >

                <X size={20} />

              </button>

            </div>



            <div className="flex-1 space-y-4 overflow-y-auto p-5">

              {cartCount === 0 ? (

                <div className="py-16 text-center">

                  <ShoppingCart className="mx-auto text-slate-300" size={42} />

                  <p className="mt-4 font-semibold">Your cart is empty</p>

                  <p className="mt-2 text-sm text-slate-500">

                    Add construction materials to get started.

                  </p>

                  <Button

                    className="mt-5 bg-emerald-600 text-white hover:bg-emerald-700"

                    onClick={() => setCartOpen(false)}

                  >

                    Browse materials

                  </Button>

                </div>

              ) : (

                products

                  .filter((product) => (cart[product.id] || 0) > 0)

                  .map((product) => (

                    <div

                      key={product.id}

                      className="flex gap-3 border-b border-slate-100 pb-4"

                    >

                      <div

                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${product.color}`}

                      >

                        <ProductIllustration image={product.image} />

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="font-semibold">{product.name}</p>

                        <p className="mt-1 text-xs text-slate-500">

                          {money(product.price)} / {product.unit}

                        </p>

                        <div className="mt-2 flex items-center gap-3">

                          <button

                            onClick={() => changeQuantity(product.id, -1)}

                            className="rounded border border-slate-200 p-1"

                            aria-label={`Remove one ${product.name}`}

                          >

                            <Minus size={13} />

                          </button>

                          <span className="text-sm font-semibold">

                            {cart[product.id]}

                          </span>

                          <button

                            onClick={() => changeQuantity(product.id, 1)}

                            className="rounded border border-slate-200 p-1"

                            aria-label={`Add one ${product.name}`}

                          >

                            <Plus size={13} />

                          </button>

                        </div>

                      </div>

                      <p className="shrink-0 text-sm font-bold">

                        {money(product.price * cart[product.id])}

                      </p>

                    </div>

                  ))

              )}

            </div>



            {cartCount > 0 && (

              <div className="border-t border-slate-200 p-5">

                <div className="flex items-center justify-between">

                  <span className="font-semibold text-slate-600">

                    Estimated total

                  </span>

                  <span className="text-xl font-extrabold">

                    {money(cartTotal)}

                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">

                  Illustrative prices only. Delivery, final supplier quotes,

                  and order confirmation are not included.

                </p>

                <Button

                  className="mt-4 w-full bg-emerald-600 text-white hover:bg-emerald-700"

                  onClick={() => {

                    setCartOpen(false);

                    window.alert(

                      "Your demo cart is ready. Checkout and order submission will be added in a later step."

                    );

                  }}

                >

                  Continue to checkout

                  <ArrowRight size={16} />

                </Button>

              </div>

            )}

          </aside>

        </div>

      )}

    </main>

  );

}
