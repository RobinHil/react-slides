function List({ list=[], type="bulleted" }) {
    switch (type) {
        case "bulleted": {
            return (
                <ul className="list-disc text-black text-md">
                    {list.map(entry => (
                        <li>{entry}</li>
                    ))}
                </ul>
            );
        }
        case "numbered": {
            return (
                <ol className="list-decimal text-black text-md">
                    {list.map(entry => (
                        <li>{entry}</li>
                    ))}
                </ol>
            );
        }
        default: {
            throw new Error(`Unhandled list type: ${type}`)
        }
    }
}

export default List;