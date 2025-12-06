import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';

import { ThemeProvider } from './contexts/ThemeContext';

const Home = React.lazy(() => import('./pages/Home'));
const DocumentPage = React.lazy(() => import('./pages/DocumentPage'));

function App() {
    return (
        <ThemeProvider>
            <Router>
                <ScrollToTop />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/documents/:id" element={<DocumentPage />} />
                    </Routes>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
}

export default App;
