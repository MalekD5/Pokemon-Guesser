import { Footer, Navbar } from './components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Game from './Game';
import PokemonProvider from './provider/PokemonProvider';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Navbar />
      <PokemonProvider limit={100}>
        <Game />
      </PokemonProvider>
      <Footer />
    </QueryClientProvider>
  )
}

export default App
