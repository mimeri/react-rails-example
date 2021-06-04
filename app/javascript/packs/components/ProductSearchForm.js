import React from "react";
import Select from "react-select";
import axios from "axios";

class ProductSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            options: [],
            results: {},
            loading: false,
            message: "",
        };
    }

    getRepairablesFromApi = (baseUrl, query) => {
        let url = baseUrl;
        if (query) {
            url +=
                "?" +
                encodeURIComponent("search") +
                "=" +
                encodeURIComponent(query);
        }
        // console.log("fetching from", url, "query:", query);
        return fetch(url).then((resp) => {
            return resp.json();
        });
    };

    componentDidMount() {
        // Get repair devices from api
        this.getRepairablesFromApi(
            "/products.json"
        ).then((products) => {
            // console.log("Result: ", products);
            this.setState({ results: products });
            if (this.state.options.length === 0) {
                const newOptions = products.map((product) => {
                    return { value: product.model, label: product.name };
                });
                this.setState({ options: newOptions });
            }
        });
    }

    handleChange = (selectedOption) => {
        // console.log("selected", selectedOption);
        this.setState({ query: selectedOption.value }, () => {
            // console.log("query:", this.state.query);
            this.getRepairablesFromApi(
                "/repairables.json",
                this.state.query
            ).then((products) => {
                // console.log("Result: ", products);
                this.setState({ results: products });
            });
        });
    };

    renderSearchResults = () => {
        const { results } = this.state;
        const imgStyle = { height: "225px", width: "100%", display: "block" };
        // console.log("trying to render result", results);
        if (Object.keys(results).length && results.length) {
            return (
                <div className="row justify-content-between align-items-center">
                    {results.map((product) => {
                        return (
                                <div key={product.id} className="card mb-4 box-shadow">
                                    <img
                                        className="card-img-top"
                                        data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                                        alt="Thumbnail [100%x225]"
                                        style={imgStyle}
                                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1728a7d1574%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1728a7d1574%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.7109375%22%20y%3D%22120.15%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                                        data-holder-rendered="true"
                                    />
                                    <div className="card-body">
                                        <p className="card-text">
                                            {product.name}{" "}<br />
                                            {product.description}<br />
                                            {
                                            (product.quantity === 0)
                                            ? "Out of Stock"
                                            : product.quantity + " In Stock"
                                            }
                                        </p>
                                        <a href={"/products/" + product.id}><button className="btn btn-sm btn-outline-secondary mr-1">View More</button></a>
                                    </div>
                                </div>
                        );
                    })}
                </div>
            );
        }
    };

    render() {
        const { query, options } = this.state;
        // console.log("This is query", query);
        return (
            <div className="container">
                {/*Heading*/}
                <h2 className="heading">Search Devices for Sale</h2>
                {/*Search Input*/}
                <label className="search-label" htmlFor="search-input">
                    <i className="fa fa-search search-icon" />
                </label>
                <Select
                    autoFocus
                    key="repairDeviceSearch"
                    onChange={this.handleChange}
                    options={options}
                />
                {/*Result*/}
                <br />
                {this.renderSearchResults()}
            </div>
        );
    }
}
export default ProductSearchForm;
