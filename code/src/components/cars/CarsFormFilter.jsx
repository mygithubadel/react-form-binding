import React, { Component } from 'react';
import CarsService from '../../services/cars/Cars';
import './cars.scss';
import SelectField from '../common/SelectField';
import TextField from '../common/TextField';

/**
 * I chose to have a stateful component here that holds the current state of the user selections and the data fetched from the API
 */

class CarsFormFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            brand_id: '',
            model_id: '',
            keywords: '',
            brands: [],
            models: []
        };

        this.api = new CarsService();
    }

    /** lifecycle hooks */

    componentDidMount() {
        // initially fetch brands
        if (this.state.brands.length === 0) {
           this.fetchBrands(); 
        }

        // initially fetch models
        if (this.state.models.length === 0) {
           this.fetchModels();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // if the brand_id changed at any point, update component's state with the corresponding models for that brand
        if (this.state.brand_id !== prevState.brand_id) { 
           this.fetchModels(this.state.brand_id);
        }
    }
    
    /** async methods to fetch data into state */

    async fetchBrands(){
        const brands = await this.api.getBrands();
        if (brands.length > 0){
            this.setState({brands: brands});
        }
    }

    async fetchModels(brand_id = ''){
        const models = await this.api.getModels(brand_id);
        if (models.length > 0){
            this.setState({models: models});
        }
    }

    /**
     * used to add the disabled property for the button element for now,
     * in case the form isn't ready for submission ( none of the fields were selected )
     */
    getExtraButtonProps() {
        let buttonProps = {};
        if (this.state.brand_id === '' && this.state.model_id === '' && this.state.keywords === '') {
            buttonProps = { 'disabled': 'disabled' };
        }
        return buttonProps;
    }

    /**
     * simulate what happens on form submission, gets the needed data from state
     */
    handleSearch(e) {
        alert(`brand_id: ${this.state.brand_id}, model_id: ${this.state.model_id}, keywords: ${this.state.keywords}`);

        e.preventDefault(); // prevent default browser form submission behaviour
    }

    render() {
        const extraButtonProps = this.getExtraButtonProps();

        return (
            <form onSubmit={(e) => this.handleSearch(e)}>
                <div className="buy-a-car-wrapper">
                    <div className="buy-a-car-title">Buy a Car</div>

                    <div className="buy-a-car-filter">
                        <SelectField 
                            identifier="brand_select"
                            wrapperClassName="buy-a-car-field"
                            label="Brand:"
                            onChange={event => this.setState({ brand_id: event.target.value })}
                            value={this.state.brand_id}
                            options={this.state.brands.map(brand => {return {value: brand.id, name: brand.name};})}
                            emptyOptionLabel='- All Brands -' />

                        <SelectField 
                            identifier="model_select"
                            wrapperClassName="buy-a-car-field"
                            label="Model:"
                            onChange={event => this.setState({ model_id: event.target.value })}
                            value={this.state.model_id}
                            options={this.state.models.map(model => {return {value: model.id, name: model.name};})}
                            emptyOptionLabel='- Select Model -' />
                        
                        <TextField 
                            wrapperClassName="buy-a-car-field"
                            placeholder="e.g. metallic, sunroof, etc.."
                            onChange={event => this.setState({ keywords: event.target.value })}
                            label="Keywords:"
                            identifier="keywords" />
                    </div>

                    <div className="buy-a-car-button">
                        <button {...extraButtonProps}>Search Cars</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default CarsFormFilter;
