import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitNetworkJoinRequest } from "@/hooks/useQueries";
import {
  Ambulance,
  Building2,
  CheckCircle2,
  Loader2,
  Package,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const stakeholderTypes = [
  {
    id: "Hospital",
    label: "Hospital",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    description:
      "Multi-specialty, super-specialty, or single-specialty hospitals",
  },
  {
    id: "Insurance Company",
    label: "Insurance Company",
    icon: ShieldCheck,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    description: "Health insurers, TPAs, and government scheme operators",
  },
  {
    id: "Vendor/Supplier",
    label: "Vendor / Supplier",
    icon: Package,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    description: "Medical equipment, pharmaceuticals, and hospital supplies",
  },
  {
    id: "Healthcare Professional",
    label: "Healthcare Professional",
    icon: Stethoscope,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    description:
      "Doctors, specialists, nurses, and allied health professionals",
  },
  {
    id: "NGO",
    label: "NGO",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    description: "Health NGOs, patient advocacy, and community health orgs",
  },
  {
    id: "Ambulance Service",
    label: "Ambulance Service",
    icon: Ambulance,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    description: "Emergency medical transport and ambulance networks",
  },
];

const benefits = [
  "Access to 500+ network entities across 50+ cities",
  "Dedicated onboarding support and training",
  "Real-time claims and data analytics dashboard",
  "NABH compliance tools and audit support",
  "Priority listing in the healthcare network directory",
];

const stats = [
  { value: "500+", label: "Network Members" },
  { value: "48 hrs", label: "Onboarding Time" },
  { value: "₹0", label: "Joining Fee" },
  { value: "24/7", label: "Support" },
];

interface JoinFormData {
  name: string;
  orgName: string;
  orgType: string;
  contact: string;
  email: string;
  city: string;
  msg: string;
}

export function JoinNetwork() {
  const [selectedType, setSelectedType] = useState<string>("");
  const mutation = useSubmitNetworkJoinRequest();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<JoinFormData>();

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setValue("orgType", typeId);
  };

  const onSubmit = async (data: JoinFormData) => {
    try {
      await mutation.mutateAsync({
        name: data.name,
        orgType: data.orgType,
        orgName: data.orgName,
        contact: data.contact,
        msg: data.msg,
      });
      toast.success(
        "Registration submitted! Our team will contact you within 48 hours.",
      );
      reset();
      setSelectedType("");
    } catch {
      toast.error(
        "Submission failed. Please try again or contact us directly.",
      );
    }
  };

  return (
    <Layout section="join-network">
      {/* Hero */}
      <section className="pt-20 health-gradient">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs rounded-full mb-4 uppercase tracking-wider">
              Free to Join
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Join the AI Health Zon Network
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Become part of India's most comprehensive healthcare digital
              ecosystem. Connect, collaborate, and transform healthcare
              together.
            </p>
          </motion.div>
          {/* Hero Image */}
          <div className="mt-8 px-4 pb-8">
            <img
              src="/assets/generated/hero-vendors-ai-health-zon.dim_1200x600.jpg"
              alt="AI Health Zon vendor network and ecosystem"
              className="w-full max-w-4xl mx-auto rounded-2xl object-contain shadow-2xl bg-white/5"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-heading text-2xl font-bold text-health-blue">
                  {s.value}
                </div>
                <div className="text-muted-foreground text-xs">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              Register Your Organization
            </h2>
            <p className="text-muted-foreground">
              Select your stakeholder type and fill in your details to get
              started.
            </p>
          </div>

          {/* Stakeholder Type Selector */}
          <div className="mb-8">
            <h3 className="font-heading font-semibold text-foreground mb-4">
              I am a...
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {stakeholderTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleTypeSelect(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center cursor-pointer ${
                      isSelected
                        ? `${type.border} ${type.bg} shadow-sm`
                        : "border-border bg-white hover:border-border/60 hover:bg-muted/30"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${isSelected ? "bg-white" : type.bg} flex items-center justify-center mx-auto mb-2`}
                    >
                      <Icon className={`w-5 h-5 ${type.color}`} />
                    </div>
                    <p
                      className={`text-xs font-semibold ${isSelected ? type.color : "text-foreground"}`}
                    >
                      {type.label}
                    </p>
                  </button>
                );
              })}
            </div>
            {selectedType && (
              <p className="mt-2 text-xs text-muted-foreground">
                {
                  stakeholderTypes.find((t) => t.id === selectedType)
                    ?.description
                }
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl p-8 border border-border shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Dr. Rajesh Kumar"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input
                      id="orgName"
                      placeholder="City Hospital"
                      {...register("orgName", {
                        required: "Organization name is required",
                      })}
                    />
                    {errors.orgName && (
                      <p className="text-destructive text-xs">
                        {errors.orgName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <Label>Organization Type *</Label>
                  <Select
                    onValueChange={(v) => {
                      setSelectedType(v);
                      setValue("orgType", v);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={selectedType || "Select organization type"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {stakeholderTypes.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register("orgType", {
                      required: "Organization type is required",
                    })}
                  />
                  {errors.orgType && (
                    <p className="text-destructive text-xs">
                      {errors.orgType.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <Label htmlFor="contact">Contact Number *</Label>
                    <Input
                      id="contact"
                      placeholder="+91 98765 43210"
                      {...register("contact", {
                        required: "Contact is required",
                        pattern: {
                          value: /^[+\d\s-]{10,}$/,
                          message: "Valid phone required",
                        },
                      })}
                    />
                    {errors.contact && (
                      <p className="text-destructive text-xs">
                        {errors.contact.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@hospital.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Valid email required",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Bengaluru"
                    {...register("city", { required: "City is required" })}
                  />
                  {errors.city && (
                    <p className="text-destructive text-xs">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div className="mt-4 space-y-1">
                  <Label htmlFor="msg">
                    Message / How did you hear about us?
                  </Label>
                  <Textarea
                    id="msg"
                    placeholder="Tell us about your organization and what you're looking for..."
                    rows={3}
                    {...register("msg")}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full mt-6 bg-health-blue hover:bg-health-blue/90 text-white font-semibold"
                  size="lg"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Join the Network"
                  )}
                </Button>
              </form>
            </div>

            {/* Benefits */}
            <div className="space-y-5">
              <div className="bg-white rounded-xl p-6 border border-border shadow-xs">
                <h3 className="font-heading font-bold text-foreground mb-4">
                  Why Join?
                </h3>
                <ul className="space-y-3">
                  {benefits.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-health-green mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-health-blue-light rounded-xl p-5 border border-health-blue/20">
                <h4 className="font-heading font-semibold text-health-blue mb-2">
                  Fast Onboarding
                </h4>
                <p className="text-sm text-foreground/70">
                  Get onboarded in 48 hours with dedicated support from our
                  partnership team. Zero joining fees, no lock-in period.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-border shadow-xs">
                <h4 className="font-heading font-semibold text-foreground mb-3 text-sm">
                  Already a Member?
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Login to your dashboard to access your network account and
                  analytics.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-health-blue text-health-blue"
                >
                  Member Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-16 health-gradient">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white mb-10">
            Our Growing Network
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "100+", label: "Hospitals" },
              { value: "25+", label: "Insurers & TPAs" },
              { value: "200+", label: "Vendors" },
              { value: "150+", label: "Professionals" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-heading text-3xl font-bold text-white">
                  {s.value}
                </div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
