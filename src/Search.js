const Search = ({search,setSearch}) =>{
    return(
        <div className="searchRoot">
            <input type="text" 
            className="search"
            value={search}
            placeholder="enter item to search"
            onChange={e=>setSearch(e.target.value)}
            />
        </div>
    )
}
export default Search;