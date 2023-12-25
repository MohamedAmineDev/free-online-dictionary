function Item({ item, index }) {
    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>
                <td className="fw-bolder">{item.partOfSpeech}</td>
                <td className="fst-italic"> {item.definition.definition}  </td>
            </tr>
        </>
    );
}
export default Item;