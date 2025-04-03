import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-dark text-light py-4 mt-auto ">
        <div className="container text-center">
          <p className="mb-1">© 2025 Delicious Sweet. All rights reserved.</p>
          <div>
            <Link href="#" className="text-light mx-2">Privacy Policy</Link>
            <Link href="#" className="text-light mx-2">Terms of Service</Link>
            <Link href="/login" className="text-light mx-2">Contact Us</Link>
          </div>
        </div>
      </footer>
      
    );
  }
  
