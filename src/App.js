import './styles/global.scss'
import Layout from "./components/layout";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Todo from './pages';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Todo />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;

