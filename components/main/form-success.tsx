import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function FormSuccess({ message }: { message?: string }) {
  if (!message) return;

  return (
    <Alert className="mb-3 p-3 flex items-center bg-emerald-500/15 text-emerald-500 border-0">
      <AlertDescription className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4" />
        {message}
      </AlertDescription>
    </Alert>
  );
}
