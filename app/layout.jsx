import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "SkillupAdvisa",
    description: "A comprehensive resume management tool that empowers job seekers and recruiters with resume building, tailored job matching, expert resource recommendations, and a vast resource library.",
    icons: {
        icon: '/assets/images/logo.png', 
      },
  };

  const RootLayout = ({ children }) => (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
  
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
  
  export default RootLayout;