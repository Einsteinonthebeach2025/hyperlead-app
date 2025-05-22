import FlexBox from 'app/components/containers/FlexBox';
import UserJobTiitle from './UserJobTiitle';
import UserPersonalInfo from './UserPersonalInfo';
import UserRegions from './UserRegions';

const UserInfoDetails = ({ item }) => {
  return (
    <FlexBox type="row-between" className='items-start border-b border-neutral-200 pb-3'>
      <UserPersonalInfo item={item} />
      <UserJobTiitle item={item} />
      <UserRegions item={item} />
    </FlexBox>
  )
}

export default UserInfoDetails