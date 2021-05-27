import React, { Component } from "react";
import SearchForm from "../components/SearchForm/SearchForm";
import RxResults from "../components/RxResults/RxResults";
import { Form } from 'react-bootstrap';
import "./Medication.css";
import API from "../utils/API";

class Search extends Component {
    state = {
        search: "",
        prescriptions: [],
        results: [],
        error: ""
    };

    componentDidMount() {
        API.getDrugInfo(this.state.search)
            .then(res => this.setState({ prescriptions: res.data.products.brand_name, dosage: res.data.products.active_ingredients.strength }))
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        console.log('rx');
        const value = event.target.value;
        const name = this.state.prescriptions;
        // const dose = this.state.dosage;

        console.log(name);
        // console.log(dose);
        const searchResults = name.filter((name) => {
            console.log(name);
            // toLowerCase
            return name.toLowerCase().startsWith(this.state.search)
        });
        console.log(searchResults);

        this.setState({
            search: value,
            prescriptions: searchResults
        });
    };

    // handleFormSubmit = event => {
    //     event.preventDefault();
    //     this.getDrugInfo(this.state.search);
    // };

    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="column">
                            <h1 className="text-center">Find your medication here</h1>
                            <SearchForm
                                handleInputChange={this.handleInputChange}
                                // handleFormSubmit={this.handleFormSubmit}
                                prescriptions={this.state.prescriptions}
                                search={this.state.search}
                            />
                            <RxResults />
                        </div>
                        <div class="column">
                            <Form.Label id="question">Did you take your meds yet? 🤔</Form.Label>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check id="yes" type="checkbox" label="Yes" />
                                <Form.Check id="no" type="checkbox" label="No" />
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;