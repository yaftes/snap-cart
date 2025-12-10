import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-yellow-400 mb-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < Math.floor(rating) ? "fill-yellow-400" : "fill-transparent text-gray-300"}`}
      />
    ))}
    <span className="text-sm text-black ml-1 font-normal">{rating}/5</span>
  </div>
);


export default StarRating;