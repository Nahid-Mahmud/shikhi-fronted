"use client";
import { useState, useRef } from "react";
import { z } from "zod";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BookOpen,
  Tag,
  ImageIcon,
  DollarSign,
  Settings,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useCreateCourseMutation } from "@/redux/features/course/course.api";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

// TODO: Fetch categories from backend API

const courseStatuses = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

type FormState = {
  title: string;
  slug: string;
  description: string;
  thumbnail: File | null;
  price: number;
  isFree: boolean;
  status: string;
  categoryId: string;
  loading: boolean;
  success: string;
  error: string;
};

const initialState: FormState = {
  title: "",
  slug: "",
  description: "",
  thumbnail: null,
  price: 0,
  isFree: true,
  status: courseStatuses[0].value,
  categoryId: "",
  loading: false,
  success: "",
  error: "",
};

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.any().optional(),
  price: z.number().min(0, "Price must be 0 or greater"),
  isFree: z.boolean(),
  status: z.enum(["draft", "published", "archived"]),
  categoryId: z.string().min(1, "Category is required"),
});

export default function CreateCoursePage() {
  // course category form api
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoriesQuery();

  // create course hook
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();

  // get user
  const { data: user, isLoading: isUserLoading } = useGetMeQuery();

  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof FormState, value: FormState[keyof FormState]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const generated = slugify(value, { lower: true, strict: true });
    setForm((prev) => ({ ...prev, title: value, slug: generated }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) set("thumbnail", e.target.files[0]);
  };

  const handleIsFreeChange = (checked: boolean) => {
    setForm((prev) => ({ ...prev, isFree: checked, price: checked ? 0 : prev.price }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, loading: true, success: "", error: "" }));
    setErrors({});

    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        isFree: form.isFree,
        price: form.isFree ? 0 : Number(form.price),
        status: form.status as "draft" | "published" | "archived",
        categoryId: form.categoryId,
      };

      const parsed = courseSchema.safeParse(payload);
      if (!parsed.success) {
        const fieldErrors: Record<string, string> = {};
        parsed.error.issues.forEach((err) => {
          const key = String(err.path[0] ?? "_");
          if (!fieldErrors[key]) fieldErrors[key] = err.message;
        });
        setErrors(fieldErrors);
        setForm((prev) => ({ ...prev, loading: false }));
        return;
      }

      // TODO: Replace with actual API call
      // await new Promise((res) => setTimeout(res, 1200));

      if (!user) {
        setForm((prev) => ({ ...prev, error: "User not authenticated. Please log in.", loading: false }));
        toast.error("User not authenticated. Please log in.");
        return;
      }

      const res = await createCourse({
        title: form.title,
        description: form.description,
        isFree: form.isFree,
        price: form.isFree ? 0 : Number(form.price),
        status: form.status as "draft" | "published" | "archived",
        categoryId: form.categoryId,
        instructorId: user?.data.id, // TODO: Replace with actual instructor ID from auth context
      }).unwrap();

      if (res.success) {
        toast.success("Course created successfully!");
      }

      setForm({ ...initialState, success: "Course created successfully!" });
    } catch {
      setForm((prev) => ({ ...prev, error: "Failed to create course. Please try again.", loading: false }));
    }
  };

  const statusColors: Record<string, string> = {
    draft: "bg-amber-100 text-amber-800 border-amber-200",
    published: "bg-emerald-100 text-emerald-800 border-emerald-200",
    archived: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <div className="min-h-screen  flex items-start justify-center py-12 px-4">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold  tracking-tight">Create a Course</h1>
            <p className="text-slate-400 text-sm">Fill in the details to publish your new course.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          {/* Basic Info */}
          <Card className="shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className=" text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Basic Information
              </CardTitle>
              <CardDescription className=" text-sm">Name and describe your course.</CardDescription>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-5 space-y-4">
              <div className="space-y-1.5">
                <Label className=" text-sm font-medium">
                  Course Title <span className="text-red-400">*</span>
                </Label>
                <Input
                  value={form.title}
                  onChange={handleTitleChange}
                  required
                  placeholder="e.g. Advanced React Patterns"
                  className="bg-transparent border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary h-10"
                />
                {errors.title && <p className="text-destructive text-xs mt-1">{errors.title}</p>}
              </div>

              <div className="space-y-1.5">
                <Label className=" text-sm font-medium flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  Slug
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2  text-sm select-none">courses/</span>
                  <Input
                    value={form.slug}
                    onChange={(e) => set("slug", e.target.value)}
                    required
                    readOnly
                    placeholder="auto-generated"
                    className="bg-card/50 border-border text-muted-foreground pl-18 placeholder:text-muted-foreground focus-visible:ring-primary cursor-default h-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className=" text-sm font-medium">
                  Description <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  required
                  placeholder="What will students learn? Who is this for?"
                  rows={4}
                  className="bg-transparent border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary resize-none"
                />
                {errors.description && <p className="text-destructive text-xs mt-1">{errors.description}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail */}
          <Card className="shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className=" text-base flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-400" />
                Thumbnail
              </CardTitle>
              <CardDescription className=" text-sm">Upload a cover image (JPG, PNG, WEBP).</CardDescription>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-5">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer border-2 border-dashed border-border hover:border-primary/60 rounded-xl p-8 text-center transition-all duration-200 bg-card/30 hover:bg-card/60"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
                {form.thumbnail ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className=" text-sm font-medium truncate max-w-xs">{form.thumbnail.name}</p>
                      <p className=" text-xs">{(form.thumbnail.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        set("thumbnail", null);
                      }}
                      className="ml-auto  hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-slate-600 text-xs">Recommended: 1280×720px</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className=" text-base flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-400" />
                Pricing
              </CardTitle>
              <CardDescription className=" text-sm">Set whether this course is free or paid.</CardDescription>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-5 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700">
                <div>
                  <p className=" text-sm font-medium">Free Course</p>
                  <p className=" text-xs">Students can enroll at no cost</p>
                </div>
                <Switch
                  checked={form.isFree}
                  onCheckedChange={handleIsFreeChange}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {!form.isFree && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <Label className=" text-sm font-medium">
                    Price (USD) <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2  text-sm">$</span>
                    <Input
                      type="number"
                      value={form.price || ""}
                      onChange={(e) => set("price", Number(e.target.value))}
                      min={0}
                      step={0.01}
                      required={!form.isFree}
                      placeholder="29.99"
                      className="bg-transparent border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary pl-7 h-10"
                    />
                    {errors.price && <p className="text-destructive text-xs mt-1">{errors.price}</p>}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="shadow-xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className=" text-base flex items-center gap-2">
                <Settings className="w-4 h-4 text-indigo-400" />
                Settings
              </CardTitle>
              <CardDescription className=" text-sm">Configure visibility and category.</CardDescription>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className=" text-sm font-medium">Status</Label>
                  <Select value={form.status} onValueChange={(v) => set("status", v)}>
                    <SelectTrigger className="bg-card/80 border-border text-foreground focus:ring-primary h-10">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs px-1.5 py-0 border ${statusColors[form.status]}`}
                          >
                            {courseStatuses.find((s) => s.value === form.status)?.label}
                          </Badge>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {courseStatuses.map((s) => (
                        <SelectItem
                          key={s.value}
                          value={s.value}
                          className="text-foreground focus:bg-card focus:text-foreground"
                        >
                          <Badge variant="outline" className={`text-xs px-1.5 py-0 border ${statusColors[s.value]}`}>
                            {s.label}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className=" text-sm font-medium">Category</Label>
                  <Select value={form.categoryId} onValueChange={(v) => set("categoryId", v)}>
                    <SelectTrigger className="bg-card/80 border-border text-foreground focus:ring-primary h-10">
                      {categoriesLoading ? (
                        <SelectValue placeholder="Loading categories..." />
                      ) : (
                        <SelectValue placeholder="Select category" />
                      )}
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {categories?.data?.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          className="text-foreground focus:bg-card focus:text-foreground"
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && <p className="text-destructive text-xs mt-1">{errors.categoryId}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          {form.success && (
            <Alert className="bg-card/60 border-border text-foreground animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <AlertDescription className="text-foreground">{form.success}</AlertDescription>
            </Alert>
          )}
          {form.error && (
            <Alert className="bg-card/60 border-border text-foreground animate-in fade-in slide-in-from-bottom-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <AlertDescription className="text-destructive">{form.error}</AlertDescription>
            </Alert>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={form.loading}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-200 disabled:opacity-60"
          >
            {form.loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Course...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Create Course
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
