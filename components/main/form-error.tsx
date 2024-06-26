import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function FormError({ message }: { message?: string }) {
  if (!message) return;

  return (
    <Alert className="mb-3 p-3 flex items-center bg-destructive/15 text-destructive border-0">
      <AlertDescription className="flex items-center gap-2">
        <CircleAlert className="h-4 w-4" />
        {message}
      </AlertDescription>
    </Alert>
  );
}
