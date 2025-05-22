import FlexBox from 'app/components/containers/FlexBox'
import IconContainer from 'app/components/containers/IconContainer'
import Paragraph from 'app/components/Paragraph'
import SubTitle from 'app/components/SubTitle'
import React from 'react'
import { FaGlobe, FaLinkedin, FaTwitter } from 'react-icons/fa'

const UserJobTiitle = ({ item }) => {
    const { position, company, twitter_url, linkedin_url, web_url } = item;

    return (
        <FlexBox type="column" className="items-center">
            <SubTitle>{company}</SubTitle>
            <Paragraph className="font-normal">{position}</Paragraph>
            <FlexBox type="row" className="gap-2 items-center mt-2">
                {web_url && <IconContainer href={web_url} size="sm">{<FaGlobe size={20} />}</IconContainer>}
                {twitter_url && <IconContainer href={twitter_url} size="sm">{<FaTwitter size={20} />}</IconContainer>}
                {linkedin_url && <IconContainer href={linkedin_url} size="sm">{<FaLinkedin size={20} />}</IconContainer>}
            </FlexBox>
        </FlexBox>
    )
}

export default UserJobTiitle