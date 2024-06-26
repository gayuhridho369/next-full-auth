import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <Card className="mx-auto w-[450px]">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Authentication Error
        </CardTitle>
        <CardDescription className="text-center">
          Something went wrong!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-center text-sm">
          <Link href="/login" className="underline">
            <Button>Back to Login</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
