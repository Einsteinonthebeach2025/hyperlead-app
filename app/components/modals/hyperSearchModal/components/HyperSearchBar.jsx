import FlexBox from 'app/components/containers/FlexBox'
import Paragraph from 'app/components/Paragraph'
import Title from 'app/components/Title'
import { FaSearch } from 'react-icons/fa'

const HyperSearchBar = ({ query, setQuery }) => {
    return (
        <div className='flex-shrink-0'>
            <FlexBox type="column" className='mb-4'>
                <Title>Search Hyperbase</Title>
                <Paragraph>Discover if a lead from a specific company exists in our database.</Paragraph>
            </FlexBox>
            <div className="relative mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., Google, Rockstar Games, Ubisoft"
                />
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    )
}

export default HyperSearchBar