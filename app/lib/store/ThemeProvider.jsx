'use client'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectIsDarkMode } from 'app/features/modalSlice'

const ThemeProvider = ({ children }) => {
    const isDarkMode = useSelector(selectIsDarkMode)

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    return <>{children}</>
}

export default ThemeProvider
