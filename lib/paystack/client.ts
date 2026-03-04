// lib/paystack/client.ts
const SECRET = process.env.PAYSTACK_SECRET_KEY!;
const BASE = "https://api.paystack.co";

async function paystackRequest<T>(
  path: string,
  method = "GET",
  body?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!data.status) throw new Error(data.message || "Paystack error");
  return data.data as T;
}

export interface InitializePaymentResult {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export async function initializePayment(params: {
  email: string;
  amount: number;
  reference: string;
  metadata?: Record<string, unknown>;
  callbackUrl?: string;
}): Promise<InitializePaymentResult> {
  return paystackRequest<InitializePaymentResult>(
    "/transaction/initialize",
    "POST",
    {
      email: params.email,
      amount: params.amount * 100,
      reference: params.reference,
      currency: "GHS",
      callback_url: params.callbackUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify`,
      metadata: params.metadata,
    }
  );
}

export interface VerifyPaymentResult {
  status: string;
  reference: string;
  amount: number;
  id: number;
  customer: { email: string };
  metadata?: Record<string, unknown>;
}

export async function verifyPayment(reference: string): Promise<VerifyPaymentResult> {
  return paystackRequest<VerifyPaymentResult>(`/transaction/verify/${reference}`);
}

export function verifyWebhookSignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac("sha512", SECRET)
    .update(body)
    .digest("hex");
  return hash === signature;
}

import crypto from "crypto";

// Alias used by domain payment flow
export async function initializePaystackTransaction(params: {
  email: string;
  amount: number;
  reference: string;
  metadata?: Record<string, unknown>;
  callback_url?: string;
}): Promise<InitializePaymentResult> {
  return paystackRequest<InitializePaymentResult>(
    "/transaction/initialize",
    "POST",
    {
      email: params.email,
      amount: params.amount,
      reference: params.reference,
      currency: "GHS",
      callback_url: params.callback_url || `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify`,
      metadata: params.metadata,
    }
  );
}
