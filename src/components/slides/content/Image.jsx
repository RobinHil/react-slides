function Image({ children, src="", alt="" }) {
    return (
    <>
        {!children
            ? <img src={src} alt={alt} />
            : (
                <div className="flex flex-col items-center">
                    <img src={src} alt={alt} className="text-black text-6xl font-bold" />
                    <p className="text-black text-md italic">{children}</p>
                </div>
              )
        }
    </>
    );
}

export default Image;