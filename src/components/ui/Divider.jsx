const Divider = ({ className = "" }) => {
    return (
        <div className={`divider-wrapper ${className}`}>
            <div className="divider-line"></div>
        </div>
    );
};

export { Divider };
