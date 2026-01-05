import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';

import { ThemeProvider } from './contexts/ThemeContext';

const Home = React.lazy(() => import('./pages/Home'));
const DocumentPage = React.lazy(() => import('./pages/DocumentPage'));
const SNSTransformation = React.lazy(() => import('./pages/SNSTransformation'));
const SNSSimulator = React.lazy(() => import('./pages/SNSSimulator'));
const DesignSystem = React.lazy(() => import('./pages/DesignSystem'));

function App() {
    return (
        <ThemeProvider>
            <Router>
                <ScrollToTop />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sns-transformation" element={<SNSTransformation />} />
                        <Route path="/sns-simulator" element={<SNSSimulator />} />
                        <Route path="/design-system" element={<DesignSystem />} />
                        <Route path="/documents/:id" element={<DocumentPage />} />
                    </Routes>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
}

export default App;
