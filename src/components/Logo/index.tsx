interface Props {
  size?: "sm";
}
export function Logo({ size }: Props) {
  if (size === "sm") {
    return (
      <div className="relative select-none">
        <div className="font-satisfy text-4xl leading-none text-gray-50">
          Banos
        </div>
      </div>
    );
  }

  return (
    <div className="w-[200px] relative select-none">
      <div className="font-satisfy text-7xl leading-none text-gray-50">
        Banos
      </div>
      <div className="font-satisfy text-3xl leading-none text-gray-50 mt-[-12px] ml-[30px]">
        de Agua Santa
      </div>
    </div>
  );
}
