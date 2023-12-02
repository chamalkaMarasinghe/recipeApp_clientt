import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { Provider } from 'react-redux';
import { Store } from "./redux/store";
import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/es/integration/react";

function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistStore(Store)}>
        <div className="App">
          <BrowserRouter>      
            <Router />
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
