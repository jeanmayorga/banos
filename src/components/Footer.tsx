import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-8 bg-muted border-t border-gray-200 dark:border-gray-800 py-4">
      <div className="flex items-center justify-center my-8">
        <Logo className="text-rose-400 " />
      </div>
    </footer>
  );
}
