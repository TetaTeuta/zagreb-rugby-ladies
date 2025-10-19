import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Schedule from "./pages/Schedule";
import Rugby101 from "./pages/Rugby101";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-grad-start to-grad-end">
                <Header />
                <main className="flex-1">
                    <Routes>
                        {/* English routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/rugby101" element={<Rugby101 />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />

                        {/* Croatian routes */}
                        <Route path="/hr" element={<Home />} />
                        <Route path="/hr/about" element={<About />} />
                        <Route path="/hr/team" element={<Team />} />
                        <Route path="/hr/schedule" element={<Schedule />} />
                        <Route path="/hr/rugby101" element={<Rugby101 />} />
                        <Route path="/hr/gallery" element={<Gallery />} />
                        <Route path="/hr/contact" element={<Contact />} />
                        <Route path="/hr/privacy" element={<Privacy />} />
                        <Route path="/hr/terms" element={<Terms />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
