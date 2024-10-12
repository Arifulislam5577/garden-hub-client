import Link from "next/link";
import HeaderMenu from "../partial/HeaderMenu";

const Header = () => {
  return (
    <header className="py-4 bg-white border-b border-b-slate-50">
      <div className="px-10 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <span className="text-green-500">Garden</span>Hub
        </Link>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
