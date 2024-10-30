type CustomBtnProps = {
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  text: string;
  onClick: () => void;
  className?: string;
};

const CustomButton = ({
  bgColor,
  borderColor,
  textColor,
  text,
  onClick,
  className,
}: CustomBtnProps) => {
  return (
    <button
      className={`border px-6 py-2 bg-[${bgColor}] border-[${borderColor}] text-[${textColor}] mr-2 font-semibold ${className}`}
      onClick={() => onClick()}
      style={{ color: textColor }}
    >
      {text}
    </button>
  );
};

export default CustomButton;
