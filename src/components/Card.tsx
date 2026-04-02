import type { ReactNode } from "react";


interface CardProps {
  title: string;
  children: ReactNode;
  theme: string;
}

const Card = ({ title, children, theme }: CardProps) => {
  return (
    <div
      className={`
        bg-${theme === "light" ? "white" : "gray-800"}
        border border-gray-200
        rounded-lg md:rounded-xl
        p-3 md:p-4
        shadow-sm md:shadow
      `}
    >
      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
        {title}
      </h3>

      <div
        className={`text-xs md:text-sm ${
          theme === "light" ? "text-gray-700" : "text-gray-300"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
