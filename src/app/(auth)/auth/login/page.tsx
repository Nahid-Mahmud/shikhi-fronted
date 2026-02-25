"use client";

import { Button } from "@/components/ui/button";
import { CloudCog, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { TError } from "@/types";
import { z } from "zod";
import { toast } from "sonner";
import setSession from "@/service/setSession";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string") {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the validation errors");
      return;
    }

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      console.log(response);
      setSession({
        id: response.data.id,
        role: response.data.role,
        status: response.data.status,
        email: response.data.email,
      });

      if (response.success) {
        toast.success("Login successful! Redirecting...");
        router.push("/");
      }
    } catch (err) {
      const error = err as TError;
      const errorMessage = error.data?.message || "Something went wrong during login";
      setErrors({
        form: errorMessage,
      });
      toast.error(errorMessage);
    }
  };

  const demoCredentials: Record<string, { email: string; password: string }> = {
    admin: { email: "superadming@email.com", password: "superadminpassword" },
    instructor: { email: "teacher@example.com", password: "Pa$$w0rd!" },
    student: { email: "tusala@mailinator.com", password: "Pa$$w0rd!" },
  };

  const handleDemoLogin = async (role: "admin" | "instructor" | "student") => {
    const creds = demoCredentials[role];
    try {
      const response = await login({ email: creds.email, password: creds.password }).unwrap();

      setSession({
        id: response.data.id,
        role: response.data.role,
        status: response.data.status,
        email: response.data.email,
      });

      if (response.success) {
        toast.success("Demo login successful! Redirecting...");
        router.push("/");
      }
    } catch (err) {
      const error = err as TError;
      const errorMessage = error.data?.message || "Something went wrong during demo login";
      setErrors({ form: errorMessage });
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your account to continue learning</p>
            </div>

            {/* Login Form */}
            <div className="rounded-lg border border-border bg-card p-8 space-y-6">
              {errors.form && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                  {errors.form}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-geist"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1 font-geist">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-10 font-geist"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500 mt-1 font-geist">{errors.password}</p>}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-border cursor-pointer"
                    />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <Link href="#" className="text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full text-base font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Demo Login Buttons */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">Quick demo sign-in</p>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="w-full text-sm"
                    onClick={() => handleDemoLogin("admin")}
                    disabled={isLoading}
                  >
                    Admin
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-sm"
                    onClick={() => handleDemoLogin("instructor")}
                    disabled={isLoading}
                  >
                    Instructor
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-sm"
                    onClick={() => handleDemoLogin("student")}
                    disabled={isLoading}
                  >
                    Student
                  </Button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">or</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  GitHub
                </Button>
              </div>
            </div>

            {/* Signup Link */}
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
                  Create one now
                </Link>
              </p>
              <div className="pt-4 border-t border-border">
                <details className="group cursor-pointer">
                  <summary className="font-medium text-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
                    Need help signing in?
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <p>
                      If you&apos;re having trouble accessing your account, try{" "}
                      <Link href="#" className="text-primary hover:underline">
                        resetting your password
                      </Link>
                      .
                    </p>
                    <p>
                      For other issues, please{" "}
                      <Link href="/contact" className="text-primary hover:underline">
                        contact our support team
                      </Link>
                      .
                    </p>
                  </div>
                </details>
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground flex items-start gap-2">
                <span>🔒</span>
                <span>Your password is encrypted and never stored in plain text. We take security seriously.</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
