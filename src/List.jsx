import Item from "./Item";

function List({ data }) {
    return (
        <>
            <table className="table  border-primary table-hover ">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type</th>
                        <th scope="col">Definition</th>
                    </tr>
                    {data.map((d, index) => {
                        return <Item item={d} key={index} index={index} />
                    })}
                </thead>
                <tbody>

                </tbody>
            </table>
        </>
    );
}
export default List;