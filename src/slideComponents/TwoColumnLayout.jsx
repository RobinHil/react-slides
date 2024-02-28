function TwoColumnLayout({ leftContent, rightContent }) {
    return (
        <div className="flex justify-center">
            <div className="w-1/2 pr-4">
                {leftContent}
            </div>
            <div className="w-1/2 pl-4">
                {rightContent}
            </div>
        </div>
    );
}

export default TwoColumnLayout;
