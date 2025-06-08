import FlexBox from 'app/components/containers/FlexBox'
import { CountryFlags } from 'app/components/CountryFlags'
import SpanText from 'app/components/SpanText'
import SubTitle from 'app/components/SubTitle'
import React from 'react'
import { FaPhone } from 'react-icons/fa'
import CheckMarkButton from 'app/components/buttons/CheckMarkButton'
import Dot from 'app/components/Dot'

const UserRegions = ({ item }) => {
  const { country, city, address, phone, email, id } = item;

  return (
    <div className='flex items-center gap-2 relative'>
      <FlexBox type="column-end" className="items-center">
        {country && city ?
          <FlexBox type="row" className="gap-2 items-center">
            <SubTitle>{city}</SubTitle>  <Dot />
            <SubTitle>{country}</SubTitle> <Dot />
            <CountryFlags className="rounded-full" countryName={country} />
          </FlexBox> : " "}
        {phone && address ?
          <FlexBox type="column" className="mt-1 gap-1 items-center">
            <SpanText className="font-medium">{address}</SpanText>
            <SpanText className="font-medium flex items-center gap-2">{phone} <FaPhone className='text-green-600' /></SpanText>
          </FlexBox>
          : " "}
      </FlexBox>
      <CheckMarkButton lead={{ id, email }} type="user" />
    </div>
  )
}

export default UserRegions