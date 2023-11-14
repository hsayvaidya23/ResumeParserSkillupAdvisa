import '@styles/globals.css';

export const metadata = {
    title: "SkillupAdvisa",
    description: "A comprehensive resume management tool that empowers job seekers and recruiters with resume building, tailored job matching, expert resource recommendations, and a vast resource library.",
    icons: {
        icon: '/public/assets/images/logo.png', 
      },
  };

  const RootLayout = ({ children }) => (
    <html lang='en'>
      <body>
          <div className='main'>
            <div className='gradient' />
          </div>
  
          <main className='app'>
            {children}
          </main>
      </body>
    </html>
  );
  
  export default RootLayout;