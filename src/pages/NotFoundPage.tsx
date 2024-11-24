import Link from "@/components/Link/Link.jsx";

export default function NotFoundPage() {
  return (
    <div className="page">
      <h1 className="fw-bold text-light mb-4">Page Not Found</h1>
      <p className="text-center">
        <Link href="/" className="text-light">Home</Link>
      </p>
    </div>
  );
}