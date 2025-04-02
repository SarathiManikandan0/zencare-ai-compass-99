
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <header className="w-full py-4 px-8 bg-black bg-opacity-80 backdrop-blur-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <nav>
          <motion.ul 
            className="flex space-x-6 bg-black bg-opacity-80 backdrop-blur-sm rounded-full px-6 py-2 border border-gray-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <NavItem to="/" label="Home" />
            <NavItem to="/survey" label="Survey" />
            <NavItem to="/contact" label="Contact" />
            <NavItem to="/login" label="Login" />
          </motion.ul>
        </nav>
      </div>
    </header>
  );
};

const NavItem = ({ to, label }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="text-gray-300 hover:text-white transition-colors px-3 py-2 block"
      >
        {label}
      </Link>
    </li>
  );
};

export default Navbar;
