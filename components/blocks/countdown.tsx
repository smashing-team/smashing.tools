"use client";

import { Button } from "@/components/button";
import React from "react";

export function Countdown(props: {
  remainingSeconds: number;
}): React.ReactElement {
  const [seconds, setSeconds] = React.useState(props.remainingSeconds);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const canResend = seconds <= 0;

  return (
    <Button disabled={!canResend} size="sm" variant="default">
      Resend confirmation email{" "}
      {!canResend && (
        <span id="timer" className="ml-1 font-mono tabular-nums">
          ({seconds}s)
        </span>
      )}
    </Button>
  );
}
