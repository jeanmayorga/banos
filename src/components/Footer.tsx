import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer>
      <div className="flex items-center justify-center py-16">
        <Logo className="text-gray-500" />
      </div>
    </footer>
  );
}
