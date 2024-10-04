import Pagination from "./components/Pagination"
import Posts from "./components/Posts"
import Search from "./components/Search"
import { DataContextProvider } from "./context/DataContext"


const App = () => {


  return (
    <div>
      <DataContextProvider>
      <h1 className="text-center text-3xl font-bold mt-5 ">Welcome to News Website</h1>
      <Search />
      <Pagination />
      <Posts />
      </DataContextProvider>
    </div>
  )
}

export default App