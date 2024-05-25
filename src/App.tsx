import AppProvider from './providers';
import AppRouter from './routes';
import { Toaster } from './components/ui/toaster';

export default function App() {
  return (
    <AppProvider>
      <Toaster />
      <AppRouter />
    </AppProvider>
  );
}
