import CellSimulator from "./components/CellSimulator"
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <CellSimulator />
    </div>
  );
}

export default App;
