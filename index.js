import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Button, CircularProgress, Container, Dialog, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import { auth } from '../firebase/firebase';

const REDIRECT_PAGE = '/dashboard';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: REDIRECT_PAGE,
  signInOptions: [EmailAuthProvider.PROVIDER_ID, GoogleAuthProvider.PROVIDER_ID],
};

export default function Home() {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push(REDIRECT_PAGE);
    }
  }, [authUser, isLoading]);

  return (
    <>
      <Head>
        <title>Expense Tracker - Master Your Finances</title>
      </Head>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
          background-color: #f9fafb; /* Light grayish-blue */
          background-image: url('https://i.pinimg.com/originals/4c/c9/cb/4cc9cbde26f3335f9a9f8e4ae073138b.jpg');
          width: 100vw;
        }
        cont {
         
        }
      `}</style>

      <style jsx>{`
        .image-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>

      <main>
        <Container style={{ display: 'flex', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
          <div style={{ flex: 1 }}>
            <Typography variant="h1" style={{ fontSize: '2.5rem', fontWeight: 'bold',color :'white' }}>
              Master Your Finances with
              <br />
              Expense Tracker
            </Typography>
            <Typography variant="h2" style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'whitesmoke', opacity: 0.8 }}>
              Track, Analyze, and Optimize Your Expenses Effortlessly
            </Typography>
            <div style={{ marginTop: '2rem' }}>
              <Button variant="contained" style={{ backgroundColor: '#007bff', color: '#ffffff' }} onClick={() => setLogin(true)}>
                Get Started Now
              </Button>
            </div>
            <Dialog onClose={() => setLogin(false)} open={login}>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </Dialog>
          </div>
          <div className="image-container">
          <a href="https://www.shutterstock.com/shutterstock/photos/2274231043/display_1500/stock-vector-regularly-keep-track-of-your-expenses-to-plan-a-family-budget-household-spendings-management-and-2274231043.jpg" target="_blank" rel="noopener noreferrer">
        
            <img
              src="https://www.thebalancemoney.com/thmb/RBf6k1fegVn-6GypdL6HzuOwNtE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-expense-tracker-apps-4158958_final-926fb0c0dd404614ac80b829f1b76ee8.png" // Replace with your actual image path
              alt="Expense Tracking"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
            </a>
          </div>
        </Container>
      </main>
    </>
  );
}
