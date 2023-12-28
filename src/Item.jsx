import { ACTIONS } from "./App";
function Item({ item, index, dispatch }) {
    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>
                <td className="fw-bolder">{item.partOfSpeech}</td>
                <td className="fst-italic"> {item.definition.definition}  </td>
                <td><button type="button" className="btn btn-dark text-light" onClick={(e) => {
                    dispatch({ type: ACTIONS.DATA_DELETE_ITEM, index: index });
                }}>Delete</button></td>
            </tr>
        </>
    );
}
export { Item };
export default Item;