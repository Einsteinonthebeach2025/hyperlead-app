import SubTitle from 'app/components/SubTitle'
import React from 'react'

const PwdTips = () => {
    return (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <SubTitle>
                Password Security Tips:
            </SubTitle>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside mt-1">
                <li>Use a unique password for each account</li>
                <li> Avoid using personal information</li>
                <li> Enable two-factor authentication if available</li>
            </ul>
        </div>
    )
}

export default PwdTips