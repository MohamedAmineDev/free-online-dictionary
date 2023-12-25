function Search({ word, handleSearch, doSearch }) {
    return (
        <>
            <div className="row mt-3">
                <div className="col-4"></div>
                <div className="col-4">
                    <input type="text" name="word" className="form-control" value={word} placeholder="Word" id="word" onChange={handleSearch} />
                    <button className="btn btn-success mt-2" type="button" title="Search button" name="Search-button" onClick={doSearch}>Search</button>
                </div>
                <div className="col-4"></div>
            </div>
        </>
    );
}
export { Search };
export default Search;