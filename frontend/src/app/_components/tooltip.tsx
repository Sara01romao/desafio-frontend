import { GoTriangleUp } from "react-icons/go";

type TooltipType = {
  children: React.ReactNode;
}

export function Tooltip({ children }: TooltipType) {
  return (
    <div className="w-fit absolute m-auto left-[-15] top-10 z-20 hidden transition duration-700 ease-in-out group-hover:block ">
      <p className=" bg-zinc-900/80 text-white text-[12px] px-4 py-1 rounded-md">
        {children}
      </p>

      <GoTriangleUp size={20} className="absolute top-[-13px] left-0 right-0 m-auto text-zinc-900/90" />
    </div>
  )
}