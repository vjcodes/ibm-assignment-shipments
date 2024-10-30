import COLORS from "../../utils/colors";

const Divider = ({ type }: { type: "vertical" | "horizontal" }) => {
  return (
    <div>
      {type === "vertical" && <div className={`h-full w-[1px] bg-[${COLORS.divider}] mb-2`}/>}
      {type === "horizontal" && <div className={`w-full h-[1px] bg-[${COLORS.divider}] mb-2`} />}
    </div>
  );
};

export default Divider;
