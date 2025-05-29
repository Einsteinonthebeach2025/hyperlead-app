
const SpanText = ({ children, className }) => {
    return (
        <p className={`${className} capitalize text-stone-500 dark:text-stone-100 text-[10px]`}>
            {children}
        </p>
    )
}

export default SpanText