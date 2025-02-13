import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useState, lazy, Suspense } from "react";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Link, Route, Routes } from "react-router-dom";
// import AdoptedPetContext from "./AdoptedPetContext";
import { IPet } from "./APIResponsesTypes";

const Details = lazy( () => import('./Details'))
const SearchParams = lazy( () => import('./SearchParams'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true, //experimental
    },
  },
});

const App = () => {
  // const adoptedPet = useState(null as IPet | null);
  
  return (
    <div>
        {/* <AdoptedPetContext.Provider value={adoptedPet}> */}
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Suspense 
              fallback={<div className="loading-pane">
                <h2 className="loader">🐶</h2>
              </div>
              }
            >
              <header>
                <Link to="/">Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </Provider>
    </div>
  );
};

/*
if(!container){
  throw new Error('no container to render to');
}
*/

export default App;
