
const SpanText = ({ children, className }) => {
    return (
        <p className={`${className} capitalize text-neutral-500 text-[10px]`}>
            {children}
        </p>
    )
}

export default SpanText