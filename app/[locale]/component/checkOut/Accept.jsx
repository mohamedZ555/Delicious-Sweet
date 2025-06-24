import { Link } from "@/i18n/routing";
import "@/styles/pagesStyle/accept.css";

export default function Accept() {
  return (
    <div className="accept-container">
      <div className="accept-icon-wrapper">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill="#4BB543" />
          <path
            d="M7 13l3 3 7-7"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="accept-title">Payment Confirmed!</h2>
      <p className="accept-desc">
        Thank you for your purchase. Your payment has been successfully
        processed.
      </p>
      <Link href="/" legacyBehavior>
        <a className="accept-home-btn">Go to Home</a>
      </Link>
    </div>
  );
}
