import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-[#050e2d] px-6 py-40 text-center text-white">
      <h1 className="text-4xl font-bold">Payment Cancelled</h1>
      <p className="mx-auto mt-4 max-w-xl text-gray-300">
        The payment was cancelled. You can return to Services and try again.
      </p>
      <Link
        href="/services"
        className="mt-8 inline-flex rounded-md bg-[#4ECDC4] px-6 py-3 font-semibold text-white"
      >
        Back to Services
      </Link>
    </main>
  );
}
