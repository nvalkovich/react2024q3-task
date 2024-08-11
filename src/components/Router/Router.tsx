import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SearchSection } from '../SearchSection';
import { Details } from '../Details';
import { NotFoundPage } from '../NotFoundPage';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchSection />}>
          <Route index element={null} />
          <Route path="details" element={<Details />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
