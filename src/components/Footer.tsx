import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-8 py-4">
      <div className="flex items-center justify-center my-8">
        <Logo className="text-primary" />
      </div>
    </footer>
  );
}
