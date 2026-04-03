import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import packages from "@/data/maaYojanaPackages.json";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  FileText,
  Filter,
  Info,
  RotateCcw,
  Search,
  Shield,
  Tag,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 50;

type RateRange = "all" | "0-10000" | "10001-50000" | "50001-100000" | "100001+";

interface PackageItem {
  srNo: number;
  category: string;
  speciality: string;
  packageCode: string;
  packageName: string;
  packageDescription: string;
  rate: number;
  twoHrFlag: string;
  govtReserve: string;
  procLabel: string;
  rtaFlag: string;
  implantPackage: string;
  stratification: string;
  preAuthDoc: string;
  claimDoc: string;
  specialCondition: string;
  rules: string;
}

const allPackages = packages as PackageItem[];

const ALL_SPECIALITIES = [
  "All",
  ...Array.from(new Set(allPackages.map((p) => p.speciality))).sort(),
];

const TERTIARY_COUNT = allPackages.filter(
  (p) => p.category === "Tertiary",
).length;
const SECONDARY_COUNT = allPackages.filter(
  (p) => p.category === "Secondary",
).length;

function formatCurrency(amount: number): string {
  return `\u20b9${amount.toLocaleString("en-IN")}`;
}

function matchesRateRange(rate: number, range: RateRange): boolean {
  if (range === "all") return true;
  if (range === "0-10000") return rate <= 10000;
  if (range === "10001-50000") return rate >= 10001 && rate <= 50000;
  if (range === "50001-100000") return rate >= 50001 && rate <= 100000;
  if (range === "100001+") return rate > 100000;
  return true;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  let cnt = 0;
  return parts.reduce<React.ReactNode[]>((acc, part) => {
    if (regex.test(part)) {
      cnt += 1;
      acc.push(
        <mark
          key={`hl-${cnt}`}
          className="bg-yellow-200 text-yellow-900 rounded px-0.5"
        >
          {part}
        </mark>,
      );
    } else {
      acc.push(part);
    }
    return acc;
  }, []);
}

function CategoryBadge({ category }: { category: string }) {
  if (category === "Tertiary") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
        Tertiary
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
      Secondary
    </span>
  );
}

function PackageDetailPanel({ pkg }: { pkg: PackageItem }) {
  const descParts = pkg.packageDescription
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  const preAuthItems = pkg.preAuthDoc
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
  const claimDocItems = pkg.claimDoc
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  const hasSpecialCondition =
    pkg.specialCondition &&
    pkg.specialCondition.toLowerCase() !== "no special condition";
  const hasRules = pkg.rules && pkg.rules.toLowerCase() !== "no";

  return (
    <div className="bg-gradient-to-br from-slate-50 to-teal-50/30 border-t border-teal-200 px-4 sm:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Description + Conditions */}
        <div className="lg:col-span-2 space-y-5">
          {/* Full Description */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              <FileText className="h-3.5 w-3.5 text-teal-600" />
              Package Description
            </h4>
            <div className="space-y-1.5">
              {descParts.map((part, i) => (
                <p
                  key={part.slice(0, 40)}
                  className={`text-sm leading-relaxed ${
                    i === 0 ? "font-semibold text-slate-800" : "text-slate-600"
                  }`}
                >
                  {i > 0 && (
                    <span className="text-teal-500 mr-1.5 font-bold">
                      \u203a
                    </span>
                  )}
                  {part}
                </p>
              ))}
            </div>
          </div>

          {/* Pre-Auth Docs */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              <Shield className="h-3.5 w-3.5 text-blue-600" />
              Pre-Authorization Documents Required
            </h4>
            <ul className="space-y-1.5">
              {preAuthItems.map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Claim Docs */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              <FileText className="h-3.5 w-3.5 text-green-600" />
              Claim Documents Required
            </h4>
            <ul className="space-y-1.5">
              {claimDocItems.map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Meta flags */}
        <div className="space-y-5">
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              <Info className="h-3.5 w-3.5 text-slate-500" />
              Package Flags
            </h4>
            <div className="space-y-2">
              {[
                { label: "Implant Package", value: pkg.implantPackage },
                { label: "Stratification", value: pkg.stratification },
                { label: "RTA Flag", value: pkg.rtaFlag },
                { label: "2 Hr Flag", value: pkg.twoHrFlag },
                { label: "Govt Reserve", value: pkg.govtReserve },
                { label: "Proc Label", value: pkg.procLabel },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-slate-200 text-sm"
                >
                  <span className="text-slate-500 text-xs font-medium">
                    {label}
                  </span>
                  <span className="font-semibold text-slate-700 text-xs text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Condition */}
          {hasSpecialCondition && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                <AlertCircle className="h-3.5 w-3.5" />
                Special Condition
              </h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                {pkg.specialCondition}
              </p>
            </div>
          )}

          {/* Rules */}
          {hasRules && (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
              <h4 className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">
                <Shield className="h-3.5 w-3.5" />
                Rules
              </h4>
              <p className="text-sm text-rose-800 leading-relaxed">
                {pkg.rules}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MaaYojanaPackages() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [speciality, setSpeciality] = useState("All");
  const [rateRange, setRateRange] = useState<RateRange>("all");
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allPackages.filter((pkg) => {
      if (q) {
        const matches =
          pkg.packageCode.toLowerCase().includes(q) ||
          pkg.packageName.toLowerCase().includes(q) ||
          pkg.speciality.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (category !== "All" && pkg.category !== category) return false;
      if (speciality !== "All" && pkg.speciality !== speciality) return false;
      if (!matchesRateRange(pkg.rate, rateRange)) return false;
      return true;
    });
  }, [search, category, speciality, rateRange]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const hasFilters =
    search !== "" ||
    category !== "All" ||
    speciality !== "All" ||
    rateRange !== "all";

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSpeciality("All");
    setRateRange("all");
    setPage(1);
    setExpandedRow(null);
  }

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
    setExpandedRow(null);
  }

  function handleCategory(val: string) {
    setCategory(val);
    setPage(1);
    setExpandedRow(null);
  }

  function handleSpeciality(val: string) {
    setSpeciality(val);
    setPage(1);
    setExpandedRow(null);
  }

  function handleRateRange(val: string) {
    setRateRange(val as RateRange);
    setPage(1);
    setExpandedRow(null);
  }

  function toggleRow(srNo: number) {
    setExpandedRow((prev) => (prev === srNo ? null : srNo));
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      toast.success(`Package code ${code} copied!`);
    });
  }

  function renderPageNumbers() {
    const range: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      range.push(1);
      if (currentPage > 3) range.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) range.push(i);
      if (currentPage < totalPages - 2) range.push("...");
      range.push(totalPages);
    }
    return range;
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Layout section="maa-yojana-packages">
      {/* \u2500\u2500 Hero \u2500\u2500 */}
      <section className="bg-[#0a1628] pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
            }}
          >
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-5">
              <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded tracking-widest uppercase">
                Rajasthan Government Health Scheme
              </span>
              <span className="bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded tracking-widest uppercase">
                2025\u201327 Official List
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-['Playfair_Display',serif] text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
            >
              MAA Yojana \u2014
              <br />
              <span className="text-teal-400">Package Code Directory</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-10"
            >
              Comprehensive reference for hospital staff to search, verify and
              retrieve official MAA Yojana package codes, rates and claim
              document requirements.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4"
              data-ocid="maa.hero.section"
            >
              {[
                {
                  value: "3,453",
                  label: "Total Packages",
                  color: "bg-teal-600",
                },
                { value: "36", label: "Specialities", color: "bg-blue-600" },
                {
                  value: "2 Categories",
                  label: "Tertiary & Secondary",
                  color: "bg-indigo-600",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-4 flex items-center gap-3"
                >
                  <div
                    className={`${stat.color} rounded-lg w-2 h-10 shrink-0`}
                  />
                  <div>
                    <p className="text-white font-bold text-xl leading-none">
                      {stat.value}
                    </p>
                    <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* \u2500\u2500 Stats Bar \u2500\u2500 */}
      <div className="bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
            <span className="flex items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-teal-300" />
              <strong>Total:</strong> 3,453 packages
            </span>
            <span className="text-teal-300">|</span>
            <span>
              <strong>Tertiary:</strong>{" "}
              {TERTIARY_COUNT.toLocaleString("en-IN")}
            </span>
            <span className="text-teal-300">|</span>
            <span>
              <strong>Secondary:</strong>{" "}
              {SECONDARY_COUNT.toLocaleString("en-IN")}
            </span>
            <span className="text-teal-300">|</span>
            <span className="text-teal-200">
              Last Updated: 2025\u201327 (Official MAA Yojana)
            </span>
          </div>
        </div>
      </div>

      {/* \u2500\u2500 Search & Filter \u2500\u2500 */}
      <section className="py-8 bg-slate-50 border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">
            {/* Search Input */}
            <div className="relative mb-4">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                style={{ width: 18, height: 18 }}
              />
              <Input
                type="text"
                placeholder="Search by Package Code, Name or Speciality..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-11 pr-10 h-12 text-base border-slate-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl"
                data-ocid="maa.search_input"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 text-slate-500">
                <Filter className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Filters:
                </span>
              </div>

              <Select value={category} onValueChange={handleCategory}>
                <SelectTrigger
                  className="w-40 h-9 border-slate-200 text-sm"
                  data-ocid="maa.category.select"
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Tertiary">Tertiary</SelectItem>
                  <SelectItem value="Secondary">Secondary</SelectItem>
                </SelectContent>
              </Select>

              <Select value={speciality} onValueChange={handleSpeciality}>
                <SelectTrigger
                  className="w-64 h-9 border-slate-200 text-sm"
                  data-ocid="maa.speciality.select"
                >
                  <SelectValue placeholder="Speciality" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {ALL_SPECIALITIES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s === "All" ? "All Specialities" : s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={rateRange} onValueChange={handleRateRange}>
                <SelectTrigger
                  className="w-52 h-9 border-slate-200 text-sm"
                  data-ocid="maa.rate_range.select"
                >
                  <SelectValue placeholder="Rate Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rates</SelectItem>
                  <SelectItem value="0-10000">Up to \u20b910,000</SelectItem>
                  <SelectItem value="10001-50000">
                    \u20b910,001 \u2013 \u20b950,000
                  </SelectItem>
                  <SelectItem value="50001-100000">
                    \u20b950,001 \u2013 \u20b91,00,000
                  </SelectItem>
                  <SelectItem value="100001+">Above \u20b91,00,000</SelectItem>
                </SelectContent>
              </Select>

              {hasFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="h-9 gap-1.5 text-slate-600 border-slate-300 hover:border-red-300 hover:text-red-600"
                  data-ocid="maa.clear_filters.button"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Clear
                </Button>
              )}

              <div className="ml-auto text-sm text-slate-500">
                Showing{" "}
                <strong className="text-slate-800">
                  {filtered.length.toLocaleString("en-IN")}
                </strong>{" "}
                of <strong className="text-slate-800">3,453</strong> packages
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* \u2500\u2500 Results \u2500\u2500 */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-300"
              data-ocid="maa.empty_state"
            >
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-slate-700 mb-2">
                No packages found
              </h3>
              <p className="text-slate-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-teal-500 text-teal-600 hover:bg-teal-50"
                data-ocid="maa.empty_clear.button"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </motion.div>
          )}

          {filtered.length > 0 && (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-900 hover:bg-slate-900">
                        <TableHead className="text-slate-300 text-xs font-bold uppercase tracking-wider w-16">
                          SR No
                        </TableHead>
                        <TableHead className="text-slate-300 text-xs font-bold uppercase tracking-wider w-44">
                          Package Code
                        </TableHead>
                        <TableHead className="text-slate-300 text-xs font-bold uppercase tracking-wider">
                          Package Name
                        </TableHead>
                        <TableHead className="text-slate-300 text-xs font-bold uppercase tracking-wider">
                          Speciality
                        </TableHead>
                        <TableHead className="text-slate-300 text-xs font-bold uppercase tracking-wider w-28">
                          Category
                        </TableHead>
                        <TableHead className="text-slate-300 text-xs font-bold uppercase tracking-wider w-28 text-right">
                          Rate
                        </TableHead>
                        <TableHead className="text-slate-300 text-xs font-bold uppercase tracking-wider w-28 text-center">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pageItems.map((pkg, idx) => {
                        const isExpanded = expandedRow === pkg.srNo;
                        const isEven = idx % 2 === 0;
                        return (
                          <>
                            <TableRow
                              key={pkg.srNo}
                              className={`${
                                isEven ? "bg-white" : "bg-slate-50/50"
                              } hover:bg-teal-50/40 transition-colors cursor-pointer ${
                                isExpanded ? "bg-teal-50/60" : ""
                              }`}
                              onClick={() => toggleRow(pkg.srNo)}
                              data-ocid={`maa.package.row.${idx + 1}`}
                            >
                              <TableCell className="text-slate-500 text-sm font-medium">
                                {pkg.srNo}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <code className="font-mono text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                                    {highlightText(pkg.packageCode, search)}
                                  </code>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyCode(pkg.packageCode);
                                    }}
                                    className="text-slate-400 hover:text-teal-600 transition-colors"
                                    title="Copy code"
                                    data-ocid={`maa.package.copy.${idx + 1}`}
                                  >
                                    <Copy className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm text-slate-800 font-medium leading-snug">
                                  {highlightText(pkg.packageName, search)}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="text-xs text-slate-600 leading-snug">
                                  {highlightText(pkg.speciality, search)}
                                </span>
                              </TableCell>
                              <TableCell>
                                <CategoryBadge category={pkg.category} />
                              </TableCell>
                              <TableCell className="text-right">
                                <span className="font-bold text-slate-800 text-sm">
                                  {formatCurrency(pkg.rate)}
                                </span>
                              </TableCell>
                              <TableCell className="text-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleRow(pkg.srNo);
                                  }}
                                  className="h-7 px-3 text-xs font-semibold text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                                  data-ocid={`maa.package.view.${idx + 1}`}
                                >
                                  {isExpanded ? (
                                    <>
                                      <ChevronUp className="h-3.5 w-3.5 mr-1" />
                                      Close
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="h-3.5 w-3.5 mr-1" />
                                      Details
                                    </>
                                  )}
                                </Button>
                              </TableCell>
                            </TableRow>

                            {isExpanded && (
                              <TableRow key={`${pkg.srNo}-detail`}>
                                <TableCell colSpan={7} className="p-0">
                                  <PackageDetailPanel pkg={pkg} />
                                </TableCell>
                              </TableRow>
                            )}
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {pageItems.map((pkg, idx) => {
                  const isExpanded = expandedRow === pkg.srNo;
                  return (
                    <div
                      key={pkg.srNo}
                      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                      data-ocid={`maa.package.card.${idx + 1}`}
                    >
                      <button
                        type="button"
                        className="w-full text-left p-4"
                        onClick={() => toggleRow(pkg.srNo)}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <code className="font-mono text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                              {pkg.packageCode}
                            </code>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyCode(pkg.packageCode);
                              }}
                              className="text-slate-400 hover:text-teal-600 cursor-pointer"
                              aria-label="Copy code"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-bold text-slate-800 text-sm">
                              {formatCurrency(pkg.rate)}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-slate-400" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-slate-800 mb-1">
                          {pkg.packageName}
                        </p>
                        <p className="text-xs text-slate-500 mb-2">
                          {pkg.speciality}
                        </p>
                        <CategoryBadge category={pkg.category} />
                      </button>
                      {isExpanded && <PackageDetailPanel pkg={pkg} />}
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
                  <p className="text-sm text-slate-500">
                    Page{" "}
                    <strong className="text-slate-800">{currentPage}</strong> of{" "}
                    <strong className="text-slate-800">{totalPages}</strong> (
                    {filtered.length.toLocaleString("en-IN")} results)
                  </p>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                      data-ocid="maa.pagination_prev"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {renderPageNumbers().map((pg) =>
                      pg === "..." ? (
                        <span
                          key={`ellipsis-${String(pg)}`}
                          className="h-8 w-8 flex items-center justify-center text-slate-400 text-sm"
                        >
                          \u2026
                        </span>
                      ) : (
                        <button
                          key={pg}
                          type="button"
                          onClick={() => setPage(pg as number)}
                          className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
                            currentPage === pg
                              ? "bg-teal-600 text-white"
                              : "text-slate-600 hover:bg-slate-100 border border-slate-200"
                          }`}
                          data-ocid={`maa.pagination.page.${pg}`}
                        >
                          {pg}
                        </button>
                      ),
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                      data-ocid="maa.pagination_next"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* \u2500\u2500 Info Band \u2500\u2500 */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Official MAA Yojana Data",
                desc: "Complete 2025-27 package list from the Rajasthan Government Health Scheme, including all 36 medical specialities.",
                color: "text-teal-400",
              },
              {
                icon: FileText,
                title: "Pre-Auth & Claim Docs",
                desc: "Every package includes the exact pre-authorization and claim document requirements for smooth TPA processing.",
                color: "text-blue-400",
              },
              {
                icon: CheckCircle2,
                title: "AI Health Zon Integration",
                desc: "Auto-validate package codes in real-time during claim submission with our AI Claims Intelligence Engine.",
                color: "text-green-400",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
