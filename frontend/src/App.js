import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import AnalysisPage from './pages/AnalysisPage';
import ComparisonPage from './pages/ComparisonPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Code Complexity Analyzer
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" end="true">
                  Analyze
                </Nav.Link>
                <Nav.Link as={Link} to="/compare">
                  Compare
                </Nav.Link>
                <Nav.Link as={Link} to="/help">
                  Help
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<AnalysisPage />} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        
        <footer className="bg-light py-3 mt-auto">
          <Container className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Code Complexity Analyzer
            </p>
          </Container>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;