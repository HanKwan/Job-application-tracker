interface Props {
    searchText: string;
    setSearchText: (text: string) => void;
}

const SearchBar = ({ searchText, setSearchText }: Props) => {
    return (
        <input 
            type="text" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search company ..."
        />
    )
}

export default SearchBar;