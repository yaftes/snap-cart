import StarRating from "./StarRating";

const ProductCard = ({ title, price, discountPrice, discountPercent, rating, image }: any) => {

  return (
    <div className="flex flex-col gap-3 cursor-pointer group">

      <div className="aspect-[1/1.1] bg-[#F0EEED] rounded-[20px] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium text-center p-4">
           {title} <br/> (Image)
        </div>
      </div>

      <div>
        <h3 className="font-bold text-base md:text-lg leading-tight mb-1 group-hover:underline truncate">{title}</h3>
        <StarRating rating={rating} />
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-xl">${price}</span>
          {discountPrice && (
            <>
              <span className="text-gray-400 font-bold text-xl line-through">${discountPrice}</span>
              <span className="bg-red-100 text-red-500 text-xs font-medium px-2 py-1 rounded-full">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;