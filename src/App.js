import { SearchForm } from './components/SearchForm'
import { SearchList } from './components/SearchList';
import './App.css';
import { useState } from 'react';
import { Container, Row } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { getWikiSearch, hackNewsSearch } from './service/searchService';

function App() {

  const [searchList, setSearchList] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [searchVia, setSearchVia] = useState('hack')
  const [loading, setLoading] = useState(false)

  const onSearch = async (page = 0) => {
    if (!searchValue) {
      return
    }
    let result
    try {
      setLoading(true)
      if (searchVia === 'wiki') {
        result = await getWikiSearch(searchValue, page)
      } else if (searchVia === 'hack') {
        result = await hackNewsSearch(searchValue, page)
      }
    } catch {
      setLoading(false)
      toast.error("Internal server error occured while fetching result. Please try again")
    }

    if (result) {
      if (result.currentPage === 0) {
        setSearchList(result)
      } else {
        setSearchList({
          ...result,
          data: [...searchList.data, ...result.data]
        })
      }
    }
    setLoading(false)
  }


  return (
    <div className="App">
      <Container>
        <Row>
          <SearchForm
            onSearch={onSearch}
            searchVia={searchVia}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setSearchVia={setSearchVia}
            loading={loading}
          />
          <SearchList searchList={searchList} onSearch={onSearch} loading={loading} />
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default App;
