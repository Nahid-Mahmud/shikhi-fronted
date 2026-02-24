"use client";

import { useParams } from "next/navigation";
import { useGetCourseByIdQuery } from "@/redux/features/course/course.api";
import {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useGetAllLessonsQuery,
  useUpdateLessonMutation,
} from "@/redux/features/lesson/lesson.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonType } from "@/types/lesson.types";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, Video, FileText, ChevronRight, LayoutList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DeleteConfirmation } from "@/components/ui/DeleteConfirmation";
import dynamic from "next/dynamic";

const MDXEditor = dynamic(() => import("@/components/ui/mdx-editor"), {
  ssr: false,
});

export default function AddLessons() {
  const { id } = useParams() as { id: string };
  const { data: courseData, isLoading: isCourseLoading } = useGetCourseByIdQuery(id);
  const { data: lessonsData, isLoading: isLessonsLoading } = useGetAllLessonsQuery(id);
  const [createLesson, { isLoading: isCreating }] = useCreateLessonMutation();
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [lessonType, setLessonType] = useState<LessonType>(LessonType.text);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lessonToDeleteId, setLessonToDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const course = courseData?.data;
  const lessons = useMemo(() => {
    return lessonsData?.data ? [...lessonsData.data].sort((a, b) => a.order - b.order) : [];
  }, [lessonsData]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    order: 1,
    isPreview: false,
  });

  useEffect(() => {
    if (!editingLessonId) {
      setFormData((prev) => ({ ...prev, order: lessons.length + 1 }));
    }
  }, [lessons.length, editingLessonId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "order" ? parseInt(value) || 0 : value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPreview: checked }));
  };

  const resetForm = () => {
    setEditingLessonId(null);
    setFormData({
      title: "",
      description: "",
      content: "",
      order: lessons.length + 1,
      isPreview: false,
    });
    setLessonType(LessonType.text);
    setVideoFile(null);
  };

  const handleEdit = (lesson: any) => {
    setEditingLessonId(lesson.id);
    setFormData({
      title: lesson.title,
      description: lesson.description || "",
      content: lesson.content || "",
      order: lesson.order,
      isPreview: lesson.isPreview,
    });
    setLessonType(lesson.type);
    setVideoFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (lessonId: string) => {
    setLessonToDeleteId(lessonId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!lessonToDeleteId) return;
    setIsDeleting(true);
    try {
      await deleteLesson(lessonToDeleteId).unwrap();
      toast.success("Lesson deleted successfully");
      if (editingLessonId === lessonToDeleteId) resetForm();
    } catch (error) {
      toast.error("Failed to delete lesson");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setLessonToDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Title is required");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("type", lessonType);
    payload.append("order", formData.order.toString());
    payload.append("isPreview", formData.isPreview.toString());
    payload.append("courseId", id);

    if (lessonType === LessonType.text) {
      payload.append("content", formData.content);
    } else {
      if (videoFile) {
        payload.append("video", videoFile);
      } else if (!editingLessonId) {
        toast.error("Please upload a video file");
        return;
      }
    }

    try {
      if (editingLessonId) {
        await updateLesson({ id: editingLessonId, body: payload }).unwrap();
        toast.success("Lesson updated successfully");
      } else {
        await createLesson(payload).unwrap();
        toast.success("Lesson created successfully");
      }
      resetForm();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save lesson");
    }
  };

  if (isCourseLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-card p-6 rounded-2xl border border-primary/10 shadow-sm gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-primary mb-1">
            <span>Instructor Dashboard</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Course Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent italic">
            {course?.title}
          </h1>
          <p className="text-muted-foreground">Organize your course content and add new lessons</p>
        </div>
        <div className="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
          <LayoutList className="h-4 w-4 text-primary" />
          <span className="font-semibold text-primary">{lessons.length}</span>
          <span className="text-primary/70 text-sm">Lessons Total</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Lesson List / Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="border-primary/10 bg-card/40 backdrop-blur-md overflow-hidden rounded-2xl shadow-xl">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Course Content</span>
                <Badge variant="outline" className="font-normal border-primary/20">
                  {lessons.length > 0 ? "Published" : "No content"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                {isLessonsLoading ? (
                  <div className="p-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary/40" />
                  </div>
                ) : lessons.length === 0 ? (
                  <div className="p-12 text-center space-y-3">
                    <div className="bg-primary/5 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                      <LayoutList className="h-6 w-6 text-primary/40" />
                    </div>
                    <p className="text-muted-foreground text-sm italic">
                      You haven't added any lessons yet. Use the form to get started!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-primary/5">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`group p-4 transition-all duration-300 ${editingLessonId === lesson.id ? "bg-primary/10 border-l-4 border-l-primary" : "hover:bg-primary/5"}`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm ${editingLessonId === lesson.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                          >
                            {lesson.order}
                          </div>
                          <div className="flex-grow min-w-0 pr-2">
                            <h4
                              className={`font-semibold text-sm truncate ${editingLessonId === lesson.id ? "text-primary" : ""}`}
                            >
                              {lesson.title}
                            </h4>
                            <div className="flex items-center flex-wrap gap-2 mt-2">
                              {lesson.type === LessonType.video ? (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] uppercase font-bold px-1.5 h-4 flex items-center gap-1"
                                >
                                  <Video className="h-2.5 w-2.5" /> Video
                                </Badge>
                              ) : (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] uppercase font-bold px-1.5 h-4 flex items-center gap-1"
                                >
                                  <FileText className="h-2.5 w-2.5" /> Text
                                </Badge>
                              )}
                              {lesson.isPreview && (
                                <Badge className="text-[10px] uppercase font-bold px-1.5 h-4 bg-green-500/10 text-green-600 border-none">
                                  Free
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full text-primary hover:bg-primary/20"
                              onClick={() => handleEdit(lesson)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full text-destructive hover:bg-destructive/10"
                              onClick={() => handleDelete(lesson.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-8">
          <Card className="border-primary/10 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <CardTitle className="text-xl flex items-center gap-2">
                {editingLessonId ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {editingLessonId ? "Modify Existing Lesson" : "Create New Lesson"}
              </CardTitle>
              <p className="text-primary-foreground/80 text-sm">
                Fill out the details below to {editingLessonId ? "update the" : "add a new"} lesson to your curriculum.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold">
                      Lesson Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Introduction to React Hooks"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="rounded-xl border-primary/20 focus:ring-primary/30 h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-sm font-semibold">
                      Lesson Type
                    </Label>
                    <Select value={lessonType} onValueChange={(val) => setLessonType(val as LessonType)}>
                      <SelectTrigger className="rounded-xl border-primary/20 h-11">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value={LessonType.text}>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span>Article / Text</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={LessonType.video}>
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-red-500" />
                            <span>Video Content</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold">
                    Short Summary (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a brief overview of what students will learn..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="min-h-[80px] rounded-xl border-primary/20 resize-none"
                  />
                </div>

                <Separator className="bg-primary/5" />

                {/* Content Area */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    {lessonType === LessonType.text ? (
                      <FileText className="h-4 w-4 text-primary" />
                    ) : (
                      <Video className="h-4 w-4 text-primary" />
                    )}
                    Lesson Content
                  </h3>

                  {lessonType === LessonType.text ? (
                    <div className="space-y-2">
                      <Label htmlFor="content" className="sr-only">
                        Content
                      </Label>
                      <MDXEditor
                        markdown={formData.content}
                        onChange={(markdown) => setFormData((prev) => ({ ...prev, content: markdown }))}
                        placeholder="Type or paste your lesson content here. Supports Markdown formatting."
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div
                        className={`group relative mt-1 flex justify-center px-10 pt-10 pb-10 border-2 border-dashed rounded-2xl transition-all duration-300 ${videoFile ? "border-primary bg-primary/5" : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file && file.type.startsWith("video/")) setVideoFile(file);
                        }}
                      >
                        <div className="space-y-2 text-center">
                          <div
                            className={`mx-auto h-16 w-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${videoFile ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
                          >
                            <Video className="h-8 w-8" />
                          </div>
                          <div className="flex flex-col text-sm text-muted-foreground mt-4">
                            <label
                              htmlFor="video"
                              className="relative cursor-pointer rounded-md font-bold text-primary hover:underline underline-offset-4"
                            >
                              <span>Click to upload a video</span>
                              <input
                                id="video"
                                name="video"
                                type="file"
                                accept="video/*"
                                className="sr-only"
                                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                              />
                            </label>
                            <p className="mt-1">or drag and drop MP4, WEBM</p>
                          </div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                            Maximum size: 100MB
                          </p>

                          {videoFile && (
                            <div className="mt-6 flex items-center justify-center gap-2 bg-background p-2 rounded-xl shadow-sm border border-primary/20 animate-in zoom-in-95 duration-200">
                              <Video className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium truncate max-w-[200px]">{videoFile.name}</span>
                              <button
                                type="button"
                                className="text-destructive hover:bg-destructive/10 p-1 rounded-md transition-colors"
                                onClick={() => setVideoFile(null)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}

                          {editingLessonId && !videoFile && (
                            <p className="text-xs text-amber-500 font-medium mt-4">
                              Leave empty to keep existing video
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="bg-primary/5" />

                {/* Settings Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-secondary/30 p-6 rounded-2xl border border-primary/5">
                  <div className="space-y-2">
                    <Label htmlFor="order" className="text-sm font-semibold">
                      Lesson Position
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="order"
                        name="order"
                        type="number"
                        min="1"
                        value={formData.order}
                        onChange={handleInputChange}
                        className="rounded-xl border-primary/20 w-32 h-11 text-center font-bold"
                        required
                      />
                      <span className="text-sm text-muted-foreground">Order in the curriculum</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-background px-5 py-3 rounded-xl border border-primary/10 shadow-sm">
                    <div className="space-y-0.5">
                      <Label htmlFor="isPreview" className="text-sm font-bold cursor-pointer">
                        Preview Accessible
                      </Label>
                      <p className="text-[11px] text-muted-foreground">Allow non-enrolled users to view</p>
                    </div>
                    <Switch
                      id="isPreview"
                      checked={formData.isPreview}
                      onCheckedChange={handleSwitchChange}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4">
                  {editingLessonId && (
                    <Button type="button" variant="ghost" onClick={resetForm} className="rounded-xl h-12 px-6">
                      Discard Changes
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className="rounded-xl h-12 px-8 min-w-[160px] font-bold text-base transition-all active:scale-95 shadow-[0_10px_20px_-10px_rgba(var(--primary),0.5)]"
                  >
                    {isCreating || isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        {editingLessonId ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        <span>{editingLessonId ? "Save Changes" : "Create Lesson"}</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <DeleteConfirmation
        open={isDeleteModalOpen}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setLessonToDeleteId(null);
        }}
        title="Delete Lesson"
        description="Are you sure you want to delete this lesson? All associated content will be permanently removed."
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--primary), 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--primary), 0.2);
        }
      `}</style>
    </div>
  );
}
