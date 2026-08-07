import "../css/SearchBar.css"

interface Props {
    searchText: string;
    setSearchText: (text: string) => void;
}

const SearchBar = ({ searchText, setSearchText }: Props) => {
    return (
        <input 
            className="search-bar"
            type="text" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search company ..."
        />
    )
}

export default SearchBar;