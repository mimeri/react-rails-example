import React from 'react';
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
        };
    }

    /**
     * Fetch the search results and update the state with the result.
     *
     * @param {int} updatedPageNo Updated Page No.
     * @param {String} query Search Query.
     *
     */
    fetchSearchResults = (updatedPageNo = '', query) => {
        console.log('Starting fetchSearchResult..');
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        // By default the limit of results is 20
        const searchUrl = `/search/index?search_index%5Bquery%5D=${query}`;
        console.log(`Starting fetchSearchResult with url: ${searchUrl}`);
        if (this.cancel) {
            // Cancel the previous request before making a new request
            this.cancel.cancel();
        }
        // Create a new CancelToken
        this.cancel = axios.CancelToken.source();
        axios
            .get(searchUrl, {
                cancelToken: this.cancel.token,
            })
            .then((res) => {
                const resultNotFoundMsg = !res.data.hits.length
                    ? 'There are no more search results. Please try a new search.'
                    : '';
                    console.log('result: ', res.data.hits);
                this.setState({
                    results: res.data.hits,
                    message: resultNotFoundMsg,
                    loading: false,
                });
            })
            .catch((error) => {
                if (axios.isCancel(error) || error) {
                    console.log('Error fetchSearchResult..',  error);

                    this.setState({
                        loading: false,
                        message: 'Failed to fetch results. Please check network',
                    });
                }
            });
    };


    handleOnInputChange = (event) => {
        console.log('I am changing', event.target.value);
        const query = event.target.value;
        this.setState({ query, loading: true, message: '' });

        if (!query) {
            this.setState({ query, results: {}, message: '' });
        } else {
            this.setState({ query, loading: true, message: '' }, () => {
                this.fetchSearchResults(1, query);
            });
        }
    };


    renderSearchResults = () => {
        const { results } = this.state;
        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return (
                            <a key={result.id} href={result.previewURL} className="result-items">
                                <h6 className="image-username">{result.user}</h6>
                                <div className="image-wrapper">
                                    <img className="image" src={result.previewURL} alt={result.user} />
                                </div>
                            </a>
                        );
                    })}
                </div>
            );
        }
    };

    render() {
        const { query } = this.state;
        return (
            <div className="container">
                {/*Heading*/}
                <h2 className="heading">Live Search: React Application</h2>
                {/*Search Input*/}
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        value={query}
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleOnInputChange}
                    />
                    <i className="fa fa-search search-icon" />
                </label>
                {/*Result*/}
                {this.renderSearchResults()}
            </div>
        )
    }
}
export default Search;
