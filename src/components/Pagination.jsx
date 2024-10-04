import { useNews } from "../context/DataContext"

const Pagination = () => {
  const { page, nbPages, getNextPage, getPreviousPage } = useNews()
  return (
    <div className="flex justify-center mt-2">
      <div className="w-[200px] flex justify-between ">
        <button onClick={() => getPreviousPage()} className="px-4 py-1 bg-black text-white rounded-sm">Prev</button>
        <p>{page+1} of {nbPages}</p>
        <button onClick={() => getNextPage()} className="px-4 py-1 bg-black text-white rounded-sm">Next</button>
      </div>


    </div>
  )
}

export default Pagination