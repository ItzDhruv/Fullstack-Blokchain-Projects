
import { PrivyProvider } from '@privy-io/react-auth';
const Providers = ({ children }) => {
  return (
    <PrivyProvider
      appId="cm7abnhje01q34mevp5crunjf"
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};
export default Providers;






