const Divider = ({ type }: { type: string }) => {
  return (
    <div>
      {type === "vertical" && <div className="h-full w-[1px] bg-[#EFF0F2]" />}
      {type === "horizontal" && <div className="w-full h-[1px] bg-[#EFF0F2]" />}
    </div>
  );
};

export default Divider;
