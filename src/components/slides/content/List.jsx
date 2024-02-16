function List({ list=[], type="bulleted", fontSize="md" }) {
    switch (type) {
        case "bulleted": {
            const combinedStyle = `list-disc text-black text-${fontSize}`;
            return (
                <ul className={combinedStyle}>
                    {list.map(entry => (
                        <li key={entry}>{entry}</li>
                    ))}
                </ul>
            );
        }
        case "numbered": {
            const combinedStyle = `list-decimal text-black text-${fontSize}`;
            return (
                <ol className={combinedStyle}>
                    {list.map(entry => (
                        <li key={entry}>{entry}</li>
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