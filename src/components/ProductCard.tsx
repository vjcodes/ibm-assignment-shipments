import { ProductType } from "../shared/types";

const ProductCard = ({ details }: { details: ProductType }) => {
  return (
    <div className="m-2 flex items-center">
      <div className="w-16 h-16 bg-gray-300 mr-2"/>

      <div>
        <h1 className="text-[#3a8593] font-semibold">{details?.OrderLine?.ItemDetails?.Description}</h1>
        <h1>{`Product ID: ${details?.OrderLine?.ItemDetails?.ItemID}`}</h1>
        <h1>{`Quantity: ${details?.Quantity}`}</h1>
      </div>
    </div>
  );
};

export default ProductCard;
