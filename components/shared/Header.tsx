import Link from "next/link";

const Header = () => {
  return (
    <header className="py-5 bg-white">
      <div className="px-20">
        <Link href="/" className="text-xl font-bold">
          <span className="text-green-500">Garden</span>Hub
        </Link>
      </div>
    </header>
  );
};

export default Header;
