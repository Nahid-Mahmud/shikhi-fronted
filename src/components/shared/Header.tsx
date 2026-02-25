"use client";

import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { Menu, User as UserIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: userData, isLoading: isUserLoading } = useGetMeQuery();

  const user = userData?.data;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/courses", label: "Courses" },
  ];

  const calculateDashboardLink = (role: string) => {
    switch (role) {
      case "student":
        return "/student";
      case "instructor":
        return "/instructor";
      case "admin":
        return "/admin";
      case "super_admin":
        return "/admin";
      default:
        return "/";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
              <span className="text-primary-foreground font-black text-xl italic tracking-tighter">S</span>
            </div>
            <span className=" font-black text-2xl tracking-tight text-foreground bg-clip-text">Shikhi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons / User Profile */}
          <div className="hidden sm:flex items-center space-x-3">
            {isUserLoading ? (
              <div className="h-9 w-20 animate-pulse bg-muted rounded-md"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon size={18} className="text-primary" />
                  </div>
                  <span className="hidden lg:inline-block">{user.name}</span>
                </Link>
                <Link
                  href={calculateDashboardLink(user.role)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t border-border">
              {isUserLoading ? (
                <div className="h-20 w-full animate-pulse bg-muted rounded-md"></div>
              ) : user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 px-2 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon size={18} />
                    <span>{user.name}</span>
                  </Link>
                  {/* <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full justify-start text-red-500 border-red-500/20 hover:bg-red-50"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button> */}
                  {/* link to go dashboard */}
                  <Link
                    href={calculateDashboardLink(user.role)}
                    className="block px-2 py-2 text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-secondary rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full" onClick={() => setIsMenuOpen(false)}>
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button asChild className="w-full" onClick={() => setIsMenuOpen(false)}>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
