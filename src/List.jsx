import Item from "./Item";

function List({ data,dispatch }) {
    return (
        <>
            <table className="table  border-primary table-hover " title="Response">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type</th>
                        <th scope="col">Definition</th>
                        <th scope="col">Action</th>
                    </tr>
                    {data.map((d, index) => {
                        return <Item item={d} key={index} index={index} dispatch={dispatch} />
                    })}
                </thead>
                <tbody>

                </tbody>
            </table>
        </>
    );
}
export {List};
export default List;