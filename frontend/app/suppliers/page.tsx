"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownUp,
  Building2,
  CheckCircle2,
  ChevronLeft,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { apiFetch } from "@/lib/api";

type Supplier = {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  verified: boolean;
  createdAt: string;
};

type SortOption = "newest" | "name" | "city";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [verification, setVerification] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [savingSupplier, setSavingSupplier] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [newSupplier, setNewSupplier] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
  });

  const loadSuppliers = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await apiFetch("/api/suppliers", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Unable to load suppliers. Server returned ${response.status}.`
        );
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("The server returned an unexpected response.");
      }

      setSuppliers(data as Supplier[]);
    } catch (err) {
      console.error("Failed to load suppliers:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not connect to the supplier server."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadSuppliers();
  }, [loadSuppliers]);

  const handleAddSupplier = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSavingSupplier(true);
    setFormError("");
    setFormSuccess("");

    try {
      const response = await apiFetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...newSupplier,
          verified: false,
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("That email address is already registered.");
        }

        const message = await response.text();

        throw new Error(
          message || `Could not add supplier (HTTP ${response.status}).`
        );
      }

      setFormSuccess("Supplier added successfully.");

      setNewSupplier({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        city: "",
      });

      await loadSuppliers(true);
      setAddDialogOpen(false);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Could not add supplier."
      );
    } finally {
      setSavingSupplier(false);
    }
  };

  const cities = useMemo(() => {
    return Array.from(
      new Set(
        suppliers
          .map((supplier) => supplier.city?.trim())
          .filter((value): value is string => Boolean(value))
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [suppliers]);

  const filteredSuppliers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = suppliers.filter((supplier) => {
      const matchesSearch =
        !query ||
        [
          supplier.companyName,
          supplier.contactName,
          supplier.email,
          supplier.phone,
          supplier.city,
        ].some((value) => value?.toLowerCase().includes(query));

      const matchesCity = city === "all" || supplier.city === city;

      const matchesVerification =
        verification === "all" ||
        (verification === "verified" && supplier.verified) ||
        (verification === "unverified" && !supplier.verified);

      const matchesVerifiedOnly =
        !verifiedOnly || supplier.verified;

      return (
        matchesSearch &&
        matchesCity &&
        matchesVerification &&
        matchesVerifiedOnly
      );
    });

    return result.sort((a, b) => {
      if (sortBy === "name") {
        return a.companyName.localeCompare(b.companyName);
      }

      if (sortBy === "city") {
        return a.city.localeCompare(b.city);
      }

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });
  }, [
    suppliers,
    search,
    city,
    verification,
    verifiedOnly,
    sortBy,
  ]);

  const verifiedCount = suppliers.filter(
    (supplier) => supplier.verified
  ).length;

  const clearFilters = () => {
    setSearch("");
    setCity("all");
    setVerification("all");
    setSortBy("newest");
    setVerifiedOnly(false);
  };

  const formatDate = (date: string) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(parsedDate);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="AddisLink home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
              <Building2 className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xl font-bold tracking-tight">
                AddisLink
              </p>
              <p className="text-xs text-slate-500">
                Construction Supplier Network
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Home
            </Button>

            <Button
              className="bg-blue-700 text-white hover:bg-blue-800"
              onClick={() => {
                setFormError("");
                setFormSuccess("");
                setAddDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add supplier
            </Button>

            <Button
              variant="outline"
              onClick={() => void loadSuppliers(true)}
              disabled={loading || refreshing}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
              Refresh
            </Button>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-700"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
                <Users className="h-4 w-4" />
                Supplier directory
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Find trusted suppliers
              </h1>

              <p className="mt-3 max-w-2xl text-slate-600">
                Discover construction suppliers, explore their business
                details, and connect with companies through AddisLink.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Supplier information from your database
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total suppliers
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {loading ? "—" : suppliers.length}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <Building2 className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Verified suppliers
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {loading ? "—" : verifiedCount}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm sm:col-span-2 lg:col-span-1">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Awaiting verification
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {loading ? "—" : suppliers.length - verifiedCount}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <Clock className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and filters */}
        <Card className="mb-8 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              Search suppliers
            </CardTitle>
            <CardDescription>
              Search by company, contact, email, phone, or city.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search suppliers..."
                  className="pl-10"
                  aria-label="Search suppliers"
                />
              </div>

              <Select
                value={city}
                onValueChange={(value) => setCity(value ?? "all")}
              >
                <SelectTrigger aria-label="Filter by city">
                  <SelectValue placeholder="All cities" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All cities</SelectItem>

                  {cities.map((cityName) => (
                    <SelectItem key={cityName} value={cityName}>
                      {cityName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={verification}
                onValueChange={(value) =>
                  setVerification(value ?? "all")
                }
              >
                <SelectTrigger aria-label="Filter by verification">
                  <SelectValue placeholder="All verification statuses" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    All verification statuses
                  </SelectItem>
                  <SelectItem value="verified">
                    Verified only
                  </SelectItem>
                  <SelectItem value="unverified">
                    Not verified
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex flex-col justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(event) =>
                    setVerifiedOnly(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 accent-blue-700"
                />
                Show verified suppliers only
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ArrowDownUp className="h-4 w-4" />
                  Sort:
                </div>

                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    if (
                      value === "newest" ||
                      value === "name" ||
                      value === "city"
                    ) {
                      setSortBy(value);
                    }
                  }}
                >
                  <SelectTrigger
                    className="w-[175px]"
                    aria-label="Sort suppliers"
                  >
                    <SelectValue placeholder="Sort suppliers" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="newest">
                      Newest first
                    </SelectItem>
                    <SelectItem value="name">
                      Company name
                    </SelectItem>
                    <SelectItem value="city">
                      City
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="ghost" onClick={clearFilters}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Clear filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results heading */}
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">Supplier directory</h2>
            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Loading suppliers..."
                : `${filteredSuppliers.length} supplier${
                    filteredSuppliers.length === 1 ? "" : "s"
                  } found`}
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <div>
                  <p className="font-semibold text-red-900">
                    Could not load suppliers
                  </p>
                  <p className="mt-1 text-sm text-red-800">{error}</p>
                  <p className="mt-2 text-sm text-red-800">
                    Check that your Spring Boot backend is running at{" "}
                    <code className="rounded bg-red-100 px-1">
                      {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}
                    </code>
                    .
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => void loadSuppliers(true)}
                disabled={refreshing}
                className="border-red-300 bg-white text-red-800 hover:bg-red-100"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="animate-pulse border-slate-200">
                <CardContent className="p-6">
                  <div className="mb-4 h-12 w-12 rounded-xl bg-slate-200" />
                  <div className="mb-3 h-5 w-3/4 rounded bg-slate-200" />
                  <div className="mb-6 h-4 w-1/2 rounded bg-slate-100" />
                  <div className="mb-3 h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-2/3 rounded bg-slate-100" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Supplier cards */}
        {!loading && !error && filteredSuppliers.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredSuppliers.map((supplier) => (
              <Card
                key={supplier.id}
                className="flex flex-col border-slate-200 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Building2 className="h-6 w-6" />
                    </div>

                    <Badge
                      variant="outline"
                      className={
                        supplier.verified
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }
                    >
                      {supplier.verified ? (
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                      ) : (
                        <Clock className="mr-1 h-3.5 w-3.5" />
                      )}

                      {supplier.verified
                        ? "Verified"
                        : "Not verified"}
                    </Badge>
                  </div>

                  <h3 className="break-words text-lg font-bold">
                    {supplier.companyName || "Unnamed company"}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Contact: {supplier.contactName || "Not provided"}
                  </p>

                  <div className="my-5 space-y-3 border-y border-slate-100 py-4">
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <span>{supplier.city || "Location unavailable"}</span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <span className="break-all">
                        {supplier.email || "Email unavailable"}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <span>
                        {supplier.phone || "Phone unavailable"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    Added {formatDate(supplier.createdAt)}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      View details
                    </Button>

                    <Button
                      className="bg-blue-700 text-white hover:bg-blue-800"
                      disabled={!supplier.email}
                      onClick={() => {
                        if (supplier.email) {
                          window.location.href = `mailto:${supplier.email}`;
                        }
                      }}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredSuppliers.length === 0 && (
          <Card className="border-dashed border-slate-300 bg-white">
            <CardContent className="flex flex-col items-center px-6 py-16 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>

              <h3 className="text-lg font-bold">
                No suppliers found
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                {suppliers.length === 0
                  ? "Your database does not contain any suppliers yet."
                  : "Try changing your search terms or filters to find suppliers."}
              </p>

              <Button
                variant="outline"
                className="mt-5"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Add supplier dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add a supplier</DialogTitle>
              <DialogDescription>
                Register a construction supplier. New suppliers start as not verified.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddSupplier} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="supplier-company" className="text-sm font-medium">
                  Company name *
                </label>
                <Input
                  id="supplier-company"
                  required
                  maxLength={150}
                  value={newSupplier.companyName}
                  onChange={(event) =>
                    setNewSupplier({
                      ...newSupplier,
                      companyName: event.target.value,
                    })
                  }
                  placeholder="Company name"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="supplier-contact" className="text-sm font-medium">
                  Contact person *
                </label>
                <Input
                  id="supplier-contact"
                  required
                  maxLength={100}
                  value={newSupplier.contactName}
                  onChange={(event) =>
                    setNewSupplier({
                      ...newSupplier,
                      contactName: event.target.value,
                    })
                  }
                  placeholder="Full name"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="supplier-email" className="text-sm font-medium">
                  Email *
                </label>
                <Input
                  id="supplier-email"
                  type="email"
                  required
                  maxLength={254}
                  value={newSupplier.email}
                  onChange={(event) =>
                    setNewSupplier({
                      ...newSupplier,
                      email: event.target.value,
                    })
                  }
                  placeholder="name@company.com"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="supplier-phone" className="text-sm font-medium">
                  Phone *
                </label>
                <Input
                  id="supplier-phone"
                  type="tel"
                  required
                  maxLength={30}
                  value={newSupplier.phone}
                  onChange={(event) =>
                    setNewSupplier({
                      ...newSupplier,
                      phone: event.target.value,
                    })
                  }
                  placeholder="Phone number"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="supplier-city" className="text-sm font-medium">
                  City *
                </label>
                <Input
                  id="supplier-city"
                  required
                  maxLength={100}
                  value={newSupplier.city}
                  onChange={(event) =>
                    setNewSupplier({
                      ...newSupplier,
                      city: event.target.value,
                    })
                  }
                  placeholder="e.g. Addis Ababa"
                />
              </div>

              {formError && (
                <p role="alert" className="text-sm text-red-600">
                  {formError}
                </p>
              )}

              {formSuccess && (
                <p role="status" className="text-sm text-emerald-700">
                  {formSuccess}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddDialogOpen(false)}
                  disabled={savingSupplier}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-blue-700 text-white hover:bg-blue-800"
                  disabled={savingSupplier}
                >
                  {savingSupplier ? "Saving..." : "Save supplier"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Supplier details dialog */}
        <Dialog
          open={selectedSupplier !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedSupplier(null);
          }}
        >
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            {selectedSupplier && (
              <>
                <DialogHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Building2 className="h-6 w-6" />
                  </div>

                  <DialogTitle className="break-words text-xl">
                    {selectedSupplier.companyName}
                  </DialogTitle>

                  <DialogDescription>
                    Supplier information registered with AddisLink.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-3 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-500">
                      Verification status
                    </span>

                    <Badge
                      variant="outline"
                      className={
                        selectedSupplier.verified
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }
                    >
                      {selectedSupplier.verified
                        ? "Verified"
                        : "Not verified"}
                    </Badge>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Contact person
                    </p>
                    <p className="mt-1 font-medium">
                      {selectedSupplier.contactName || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Email address
                    </p>
                    <p className="mt-1 break-all font-medium">
                      {selectedSupplier.email || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Phone number
                    </p>
                    <p className="mt-1 font-medium">
                      {selectedSupplier.phone || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      City
                    </p>
                    <p className="mt-1 font-medium">
                      {selectedSupplier.city || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Registration date
                    </p>
                    <p className="mt-1 font-medium">
                      {formatDate(selectedSupplier.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Button
                      className="flex-1 bg-blue-700 text-white hover:bg-blue-800"
                      disabled={!selectedSupplier.email}
                      onClick={() => {
                        if (selectedSupplier.email) {
                          window.location.href = `mailto:${selectedSupplier.email}`;
                        }
                      }}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email supplier
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setSelectedSupplier(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} AddisLink. Connecting
            Ethiopia&apos;s construction industry.
          </p>
        </footer>
      </div>
    </main>
  );
}