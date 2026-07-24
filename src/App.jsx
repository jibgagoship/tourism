import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Navigation from '@/components/Navigation.jsx';
import Footer from '@/components/Footer.jsx';
import Home from '@/pages/Home.jsx';
import AttractList from '@/pages/AttractList.jsx';
import AttractDetail from '@/pages/AttractDetail.jsx';
import CourseList from '@/pages/CourseList.jsx';
import CourseDetail from '@/pages/CourseDetail.jsx';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Navigation />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attractions" element={<AttractList />} />
          <Route path="/attractions/:id" element={<AttractDetail />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
