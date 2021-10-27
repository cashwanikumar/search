import { Button, Col, Input, Row } from "reactstrap"

export const SearchForm = (props) => {
    const { searchValue, setSearchValue, searchVia, setSearchVia, loading, onSearch } = props

    return (
        <Row>
            <Col xs={12} sm={6} md={5} className="p-2">
                <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} />
            </Col>

            <Col xs={12} sm={6} md={4} className="p-2">
                <Input type="select" value={searchVia} onChange={e => setSearchVia(e.target.value)}>
                    <option value="hack">Hacker News</option>
                    <option value="wiki">Wiki</option>
                </Input>
            </Col>
            <Col xs={12} sm={6} md={3} className="p-2">
                <Button onClick={() => onSearch()} className="full-width" disabled={loading}>{loading ? 'Searching... Please wait!' : 'Search'}</Button>
            </Col>
        </Row>
    )
}