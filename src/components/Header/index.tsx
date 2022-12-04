import { Logo } from "components";

export function Header() {
  return (
    <div className="bg-fuchsia-800 w-full h-[60px] flex justify-center items-center border-b border-gray-800">
      <Logo size="sm" />
    </div>
  );
}
