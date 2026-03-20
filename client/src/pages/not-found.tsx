import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-[#5D3FD3] text-xs uppercase tracking-[0.3em] font-semibold mb-4">
          404
        </p>
        <h1
          className="text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] uppercase tracking-tight"
          style={{ fontFamily: "Poppins, sans-serif" }}
          data-testid="text-404-headline"
        >
          Page Not Found.
        </h1>
        <p className="mt-4 text-[#B3B3B8] text-sm">
          This route doesn't exist. Let's get you back.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button
              className="bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold px-8"
              data-testid="button-go-home"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
