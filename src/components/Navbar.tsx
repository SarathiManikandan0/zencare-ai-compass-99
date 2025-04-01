
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-black">
      <div className="flex-1 flex justify-center">
        <Link to="/" className="text-4xl font-bold text-white">
          ZenCare
        </Link>
      </div>
      <nav className="absolute right-4">
        <ul className="flex space-x-4">
          <li>
            <Button variant="link" asChild>
              <Link to="/" className="text-white">
                Home
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link" asChild>
              <Link to="/survey" className="text-white">
                Survey
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link" asChild>
              <Link to="/contact" className="text-white">
                Contact
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link" asChild>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
