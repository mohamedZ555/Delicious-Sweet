import { Link } from "@/i18n/routing";
import "@/styles/pagesStyle/rejected.css";

export default function Reject() {
  return (
    <div className="reject-container">
      <div className="reject-icon-wrapper">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill="#ff4d4f" />
          <path
            d="M8 8l8 8M16 8l-8 8"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="reject-title">Payment Failed</h2>
      <p className="reject-desc">
        Sorry, your payment could not be processed. Please try again or contact
        support.
      </p>
      <Link href="/" legacyBehavior>
        <a className="reject-home-btn">Go to Home</a>
      </Link>
    </div>
  );
}
