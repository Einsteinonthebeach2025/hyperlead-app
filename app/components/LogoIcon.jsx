import Image from 'next/image'
import React from 'react'

const LogoIcon = ({ size }) => {
    let sizeClass = 'w-10 h-10';
    let imageSize = 100;

    if (size === 'sm') {
        sizeClass = 'w-6 h-6';
        imageSize = 60;
    } else if (size === 'lg') {
        sizeClass = 'w-14 h-14';
        imageSize = 140;
    } else if (size === 'xl') {
        sizeClass = 'w-20 h-20';
        imageSize = 200;
    }

    return (
        <div className={sizeClass}>
            <Image src="/assets/icon.png" alt="HyperLead" width={imageSize} height={imageSize} />
        </div>
    )
}

export default LogoIcon