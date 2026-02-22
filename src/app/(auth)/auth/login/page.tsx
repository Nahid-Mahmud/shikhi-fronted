"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Login attempt:", formData);
      alert("Login successful! Redirecting to dashboard...");
    } else {
      setErrors(newErrors);
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
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
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
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-10"
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
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
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
                <Button type="submit" className="w-full text-base font-semibold">
                  Sign In
                </Button>
              </form>

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
                <Link href="/signup" className="text-primary hover:underline font-semibold">
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
