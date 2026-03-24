// SearchBar.jsx
export default function SearchBar({ setSearch }) {
  return <input onChange={(e) => setSearch(e.target.value)} />;
}