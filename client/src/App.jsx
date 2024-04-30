import { useState } from "react";
import Header from "./components/Header"
import Footer from "./components/Footer"
import './App.css'
import {Outlet} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CategoryProvider} from './contexts/CategoryContext';
import { SearchProvider } from './contexts/SearchContext';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log('App setSelectedCategory : ' + selectedCategory);
  const [searchQuery, setSearchQuery] = useState(null);
  console.log('App setSelectedCategory : ' + selectedCategory);

  return (
    <CategoryProvider>
      <SearchProvider>
        <div  
        className="d-flex flex-column min-vh-100"
        style={{ backgroundImage: 'url("/bg3.jpg")', backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
          <Header setSelectedCategory={setSelectedCategory}/>
          <ToastContainer />
          <Container className=" my-auto d-flex align-items-center justify-content-center h-100"/>
          <div className="w-100 ">
            <Outlet selectedCategory={selectedCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />  
          </div>
          <Footer />
        </div>
      </SearchProvider>
    </CategoryProvider>
  )
}

export default App;