import React from 'react'
import Navbar from './Navbar';

interface Layout {
    children: React.ReactNode;
}

const Layout: React.FC<Layout> = ({ children }) => {
    return (
        <>
            <main className='min-h-screen transition-colors duration-700 bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
                <Navbar />
                {children}
            </main>
        </>
    )
}

export default Layout;
