import LinksDropdown from "@/components/links-dropdown";
import ThemeToggle from "@/components/theme-toggle";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <nav className="bg-muted flex items-center justify-between px-4 py-4 sm:px-16 lg:px-24">
      <div>
        <LinksDropdown />
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <Show when="signed-out">
          <SignInButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </nav>
  );
}

export default Navbar;
