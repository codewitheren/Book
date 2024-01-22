import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Home from './routes/Home/home'
import Book from './routes/Book/book'
import AddBook from './routes/AddBook/addbook'
import './App.css'  

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>  
    </>
  )
}

export default App
