/** Lays out two contents side by side. */
function TwoColumnLayout({ leftContent, rightContent }) {
    return (
        <div className="grid grid-cols-[repeat(2,minmax(min-content,1fr))] gap-8">
            <div>
                {leftContent}
            </div>
            <div>
                {rightContent}
            </div>
        </div>
    );
}

export default TwoColumnLayout;
