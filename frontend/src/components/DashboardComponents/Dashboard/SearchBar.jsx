import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="searchBar">
      <FaSearch className="searchIcon" />
      <input type="text" placeholder="Search..."/>
    </div>
  );
}
