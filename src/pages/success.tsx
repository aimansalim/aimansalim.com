import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-space-grotesk text-white mb-4">Message Sent Successfully</h1>
        <p className="text-white/60 mb-8">Thank you for reaching out. We'll get back to you soon.</p>
        <Link
          to="/"
          className="inline-block border border-white/10 px-6 py-3 text-sm font-space-grotesk text-white hover:bg-white/5 transition-colors uppercase tracking-wider"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
