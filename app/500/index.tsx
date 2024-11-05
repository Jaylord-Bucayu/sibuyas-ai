import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Custom500() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Session expired</h1>
          <p className="text-xl text-gray-600 mb-6">We're sorry, but something went wrong on our end.</p>
          <Link href="/" passHref>
          <Button variant="default" size="lg">
            Return to Home
          </Button>
        </Link>
        </div>
      </div>
    )
  }