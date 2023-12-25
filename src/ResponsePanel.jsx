import List from "./List";

function ResponsePanel({ data, isLoading, error }) {
    return (
        <>
            <div className="row mt-3">
                <div className="col-2"></div>
                <div className="col-8 text-center">
                    {isLoading ? (<p className="fs-3">Is Loading...</p>) : (<></>)}
                    {error ? (<p className="fs-3 text-danger">No data were found ! </p>) : (<></>)}
                </div>
                <div className="col-2"></div>
            </div>
            {data  ? (<>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="card">
                            <h5 className="card-header">Featured</h5>
                            <div className="card-body">
                                <List data={data} />
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </>) : (<></>)}
        </>
    );
}
export default ResponsePanel;