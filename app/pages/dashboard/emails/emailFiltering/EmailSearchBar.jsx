import { FaSearch } from "react-icons/fa";

const EmailSearchBar = ({ setSearch, search }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Subject, Company"
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default EmailSearchBar;
