/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '.75rem',     
        'sm': '.875rem',    
        'base': '1rem',     
        'lg': '1.125rem',  
        'xl': '1.25rem',    
        '2xl': '1.5rem',   
      
      },
      borderColor: {
        'primary' :'rgb(85 81 227)',
        'secondary' :'#2b2d77 '
      }


    },
  },
  plugins: [],
}

