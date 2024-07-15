import { useState } from "react";
import { toast } from "react-hot-toast";
import { SearchBarProps } from "../App/App.type";

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(evt.target.value);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!searchQuery.trim()) {
      return toast.error("Cannot be empty!");
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          onChange={handleChange}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
