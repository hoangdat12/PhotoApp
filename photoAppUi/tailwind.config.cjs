/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
            "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
            extend: {
                colors: {
                    'dark-purple': '#081A51',
                    'light-white': 'rgba(255,255,255,0.18)',
                    'gray-blur': '#9e9e9e'
                },
                backgroundColor: {
                    'btn-main': '#05a081',
                    'blackOverlay': 'rgba(0, 0 ,0 ,0.5)',
                    'hover-image': 'rgba(0, 0, 0, 0.4)',
                    'main-upload': '#f7f7f7'
                },
                boxShadow: {
                    'header': 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
                    'modal-header': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    'search': 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                },
                width: {
                    'header': 'calc(100% - 5rem)',
                    'header-open': 'calc(100% - 18rem)'
                },
                fontSize: {
                    'title': ['33px', '36px']
                },
                screens: {
                    'mobile': '0',
                    'tablet': '640px',
                    // => @media (min-width: 640px) { ... }
              
                    'laptop': '1024px',
                    // => @media (min-width: 1024px) { ... }
              
                    'desktop': '1280px',
                    // => @media (min-width: 1280px) { ... }
                },
            },
        },
        plugins: [],
}