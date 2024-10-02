import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-8 py-4">
      <div className="my-8 flex items-center justify-center">
        <Logo className="text-primary" />
      </div>
    </footer>
  );
}
