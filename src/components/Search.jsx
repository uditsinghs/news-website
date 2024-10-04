import { useNews } from "../context/DataContext";

const Search = () => {
  const { search } = useNews();


  return (
    <div className="flex justify-center">
      <input
        type="search"
        placeholder="Search news.."
        className="p-1 mt-3 text-xl outline-none border"
        onChange={(e) => search(e.target.value)}
      />
      <button>Search</button>
    </div>
  );
};

export default Search;
