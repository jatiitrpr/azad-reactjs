import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';


//This Component is a child Component of Customers Component
export default class MilesToKm extends Component {

    constructor(props) {
        super(props);
        this.state = {
           miles: '',
           kilometer:''
        }

    }


    //Function which is called when the component loads for the first time
    componentDidMount() {
    }

    //Function which is called whenver the component is updated
    componentDidUpdate(prevProps) {
    }

    handleChange = (name) => (event) => {

        let value = event.target.value;

        this.setState({
            [name]: value
        })

        if(name === 'miles') {
            this.setState({
                kilometer: value * 1.6
            })
        }

        if(name === 'kilometer') {
            this.setState({
                miles: value / 1.6
            })
        }
       
    }



    render() {

        return (
            <div>
                <form noValidate autoComplete="off"
                    style={{ display: 'flex', flexDirection: 'column',
                    margin: '50px 0 0 0' }}
                >
                    <TextField
                        id="miles"
                        label="Miles"
                        value={this.state.miles}
                        onChange={this.handleChange('miles')}
                    />
                    <TextField
                        id="kilometer"
                        label="Kilometer"
                        value={this.state.kilometer}
                        onChange={this.handleChange('kilometer')}
                    />
                </form>

            </div>
        );
    }
}
