"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { emailVerification } from "@/actions/email-verification";
import FormSuccess from "@/components/main/form-success";
import FormError from "@/components/main/form-error";

export default function Page() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }

    emailVerification(token).then((data) => {
      setSuccess(data.success);
      setError(data.error);
    });
  }, [token]);

  const hasEffectRun = useRef(false);

  useEffect(() => {
    if (hasEffectRun.current) return;
    if (success || error) return;
    onSubmit();
    hasEffectRun.current = true;
  }, [error, onSubmit, success]);

  return (
    <Card className="mx-auto w-[450px]">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Email Verification
        </CardTitle>
        <CardDescription className="text-center">
          Please wait a minutes, server still verificating your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!error && !success && (
          <div className="mb-8 flex items-center justify-center">
            <BeatLoader />
          </div>
        )}

        <FormSuccess message={success} />

        {!success && <FormError message={error} />}

        <div className="mt-2 text-center text-sm">
          <Link href="/login" className="underline">
            <Button>Back to Login</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
