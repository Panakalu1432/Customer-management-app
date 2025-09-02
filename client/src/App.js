import CustomerListPage from './components/CustomerList/CustomerListPage';
import CustomerDetailPage from './components/CustomerDetailPage/CustomerDetailPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerListPage />} />
        <Route path="/DetailedPage/:id" element={<CustomerDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
