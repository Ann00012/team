import css from "./SearchBar.module.css";
interface SearchBarProps {
  text: string;
  handleChange: (newText: string) => void;
}
export default function SearchBar({ text, handleChange }: SearchBarProps) {
  return (
    <input
      value={text}
      onChange={(event) => handleChange(event.target.value)}
      className={css.searchBar}
      placeholder="Search bar..."
    />
  );
}
