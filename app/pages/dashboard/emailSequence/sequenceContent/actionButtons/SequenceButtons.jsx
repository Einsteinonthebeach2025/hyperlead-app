import Delete from 'app/components/buttons/Delete'

const SequenceButtons = ({ id, onDelete, type }) => {
    return (
        <div>
            <Delete id={id} onDelete={onDelete} type={type} />
        </div>
    )
}

export default SequenceButtons