import { Link } from "react-router-dom";
import { navigationCategories } from "./navigationData";

export function DesktopMenu() {
  return (
    <div className="hidden lg:flex space-x-8">
      {navigationCategories.map((category) => (
        <Link
          key={category.name}
          to={category.path}
          className="text-gray-700 font-medium hover:text-primary transition-colors duration-200"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}