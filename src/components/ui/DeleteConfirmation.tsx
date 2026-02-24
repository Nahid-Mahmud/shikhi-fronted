import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationProps {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
  isLoading?: boolean;
}

export function DeleteConfirmation({
  open,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
  children,
  isLoading = false,
}: DeleteConfirmationProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl overflow-hidden p-0 border-none shadow-2xl">
        <div className="bg-destructive/10 p-6 flex items-center justify-center">
          <div className="bg-destructive/20 p-3 rounded-full">
            <AlertTriangle className="h-10 w-10 text-destructive animate-pulse" />
          </div>
        </div>

        <div className="p-6 pt-0 space-y-4">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-center">{title}</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground text-pretty">
              {description}
            </DialogDescription>
          </DialogHeader>

          {children && <div className="py-2">{children}</div>}

          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 rounded-xl h-11 font-semibold"
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onConfirm}
              className="flex-1 rounded-xl h-11 font-semibold shadow-lg shadow-destructive/20"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : confirmText}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
