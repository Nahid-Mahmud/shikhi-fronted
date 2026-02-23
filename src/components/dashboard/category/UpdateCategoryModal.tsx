import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateCategoryMutation } from "@/redux/features/category/category.api";
import { TError } from "@/types";
import { ICategory } from "@/types/category.types";
import { useState } from "react";
import { toast } from "sonner";

interface UpdateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ICategory | null;
}

export function UpdateCategoryModal({ isOpen, onClose, category }: UpdateCategoryModalProps) {
  const [name, setName] = useState(category?.name || "");
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !category) {
      toast.error("Category name is required");
      return;
    }
    try {
      await updateCategory({ id: category.id, body: { name } }).unwrap();
      toast.success("Category updated successfully");
      onClose();
    } catch (error: unknown) {
      const typedError = error as TError;
      toast.error(typedError?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Category Name
            </label>
            <Input
              id="name"
              placeholder="e.g. Web Development"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isUpdating}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
