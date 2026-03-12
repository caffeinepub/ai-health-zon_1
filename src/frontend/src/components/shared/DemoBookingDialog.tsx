import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitDemoBooking } from "@/hooks/useQueries";
import { Building2, Calendar, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DemoFormData {
  name: string;
  org: string;
  mobile: string;
  email: string;
  city: string;
  msg: string;
  prefDate: string;
}

interface DemoBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemoBookingDialog({
  open,
  onOpenChange,
}: DemoBookingDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoFormData>();

  const mutation = useSubmitDemoBooking();

  const onSubmit = async (data: DemoFormData) => {
    try {
      const prefDate =
        BigInt(new Date(data.prefDate).getTime()) * BigInt(1_000_000);
      await mutation.mutateAsync({
        name: data.name,
        org: data.org,
        mobile: data.mobile,
        email: data.email,
        city: data.city,
        msg: data.msg,
        prefDate,
      });
      toast.success(
        "Demo booked successfully! We'll contact you within 24 hours.",
      );
      reset();
      onOpenChange(false);
    } catch {
      toast.error("Failed to submit. Please try again or contact us directly.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-health-blue flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <DialogTitle className="font-heading text-xl">
              Book a Demo
            </DialogTitle>
          </div>
          <DialogDescription>
            Schedule a personalized demo of AI Health Zon's healthcare ecosystem
            platform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
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
              <Label htmlFor="org">Hospital / Organization *</Label>
              <Input
                id="org"
                placeholder="City Hospital"
                {...register("org", { required: "Organization is required" })}
              />
              {errors.org && (
                <p className="text-destructive text-xs">{errors.org.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                placeholder="+91 98765 43210"
                {...register("mobile", {
                  required: "Mobile is required",
                  pattern: {
                    value: /^[+\d\s-]{10,}$/,
                    message: "Valid phone number required",
                  },
                })}
              />
              {errors.mobile && (
                <p className="text-destructive text-xs">
                  {errors.mobile.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@hospital.com"
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

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
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
            <div className="space-y-1">
              <Label htmlFor="prefDate">Preferred Demo Date *</Label>
              <Input
                id="prefDate"
                type="date"
                {...register("prefDate", { required: "Date is required" })}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.prefDate && (
                <p className="text-destructive text-xs">
                  {errors.prefDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="msg">Message / Requirements</Label>
            <Textarea
              id="msg"
              placeholder="Tell us about your hospital's specific needs..."
              rows={3}
              {...register("msg")}
            />
          </div>

          <div className="flex items-center gap-2 p-3 bg-health-blue-light rounded-lg">
            <Building2 className="w-4 h-4 text-health-blue shrink-0" />
            <p className="text-xs text-health-blue">
              Demo is free and tailored to your hospital's requirements. Our
              specialist will confirm within 2 business hours.
            </p>
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-health-blue hover:bg-health-blue/90 text-white font-semibold"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Book Free Demo"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
