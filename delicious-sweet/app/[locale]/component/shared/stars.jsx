import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  return (
    <div className="d-flex align-items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span className="pe-1 stars" key={index}>
            {rating >= starValue ? (
              <FaStar />
            ) : rating >= starValue - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        );
      })}
      <div className="ms-1 text-body-secondary">(59)</div>
    </div>
  );
};

export default StarRating

