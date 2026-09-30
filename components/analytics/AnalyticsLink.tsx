"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { trackEvent, type AnalyticsEvent } from "@/lib/analytics/events";

type Props = ComponentProps<typeof Link> & { event: AnalyticsEvent };

export function AnalyticsLink({ event, onClick, ...props }: Props) {
  return <Link {...props} onClick={(click) => { trackEvent(event); onClick?.(click); }} />;
}
