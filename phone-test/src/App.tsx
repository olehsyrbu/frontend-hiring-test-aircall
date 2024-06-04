import { RouterProvider } from 'react-router-dom';
import { Tractor } from '@aircall/tractor';
import { ApolloProvider } from '@apollo/client';
import { darkTheme } from 'src/style/theme/darkTheme';
import { GlobalAppStyle } from 'src/style/global';
import client from 'src/client';
import router from 'src/router';
import 'src/App.css';

function App() {
  return (
    <Tractor injectStyle theme={darkTheme}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
        <GlobalAppStyle />
      </ApolloProvider>
    </Tractor>
  );
}

export default App;
