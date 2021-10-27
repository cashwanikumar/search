import { Button, Table } from "reactstrap"

export const SearchList = (props) => {
    const { searchList, onSearch, loading } = props
    if (!searchList) {
        return null
    }
    console.log(searchList)
    const renderList = () => searchList.data.map(result => (
        <tr>
            <td>
                <a href={result.url} rel="noreferrer" target="_blank">{result.title}</a>
            </td>
            <td>{result.author || ''} {result.submission_count || ''}</td>
        </tr>
    ))

    return (
        <>
            <Table responsive>
                <tbody>
                    {
                        searchList.data.length === 0 ? <h3>No result found</h3> : renderList()
                    }
                </tbody>
            </Table>
            {searchList.currentPage < searchList.totalPages ?
                <Button disabled={loading} onClick={() => onSearch(searchList.currentPage + 1)}>
                    {loading ? 'Loading....' : 'Load More'}
                </Button> : null}
        </>
    )
}