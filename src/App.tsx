import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CharactersProvider } from './contexts/CharactersContext';
import Items from './pages/Items';
import { EquipmentProvider } from './contexts/EquipmentContext';

export const MODAL_WIDTH = 923;

const Torero = lazy(() => import('./Torero'));
const CharacterSheet = lazy(() => import('./pages/CharacterSheet'));

const App = () => {

  return (
    <>
      <CharactersProvider>
        <EquipmentProvider>
          <Suspense fallback={<div className="container">Loading...</div>}>
            <Routes>
              <Route path="" element={<Torero />} />
              <Route path="character-sheet/new" element={<CharacterSheet />} />
              <Route path="character-sheet/:id" element={<CharacterSheet />} />
              <Route path="characters/:id/:type" element={<Items />} />
              <Route path="characters/:id/:type" element={<Items />} />
              <Route path="characters/:id/:type" element={<Items />} />
            </Routes>
          </Suspense>
        </EquipmentProvider>
      </CharactersProvider>
    </>
  )
}

export default App
