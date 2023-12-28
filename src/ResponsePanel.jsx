import { ACTIONS } from "./App";
import List from "./List";

function ResponsePanel({ data, isLoading, error, dispatch }) {
    return (
        <>
            <div className="row mt-3">
                <div className="col-2"></div>
                <div className="col-8 text-center">
                    {isLoading ? (<p className="fs-3" data-testid="loading">Is Loading...</p>) : (<></>)}
                    {error ? (<p className="fs-3 text-danger" data-testid="error">No data were found !</p>) : (<></>)}
                </div>
                <div className="col-2"></div>
            </div>
            {data ? (<>
                <div className="row" data-testid="response">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="card">
                            <h5 className="card-header">Meanings</h5>
                            <div className="card-body">
                                <List data={data} dispatch={dispatch} />
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">

                    </div>
                    <div className="col-4 text-center">
                        <button type="button" class="btn btn-primary btn-lg btn-block rounded" data-testid="sort-button" title="Sort button" onClick={(e)=>{
                            e.preventDefault();
                            dispatch({type:ACTIONS.DATA_SORT_ITEMS});
                        }}>Sort dictionary</button>
                    </div>
                    <div className="col-4">

                    </div>
                </div>
                <br />
                <br />
                <br />
            </>) : (<></>)}
        </>
    );
}
export default ResponsePanel;