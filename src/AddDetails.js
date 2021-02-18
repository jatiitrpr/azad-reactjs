import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';


export const getBase64 = (file, callback) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        callback(reader.result);
    };
    reader.onerror = function (error) {
        callback(null);
    };
};


//This Component is a child Component of Customers Component
export default class AddDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            basic_data: {},
            all_data: []
        }

    }

    resetBasicData = () => {
        this.setState({
            basic_data: {
                name: '',
                password: '',
                mobile: '',
                address: '',
                pincode: '',
                city: '',
                state: '',
                discription: '',
                profile_pic: '',
                dob: ''
            }
        })
    }


    //Function which is called when the component loads for the first time
    componentDidMount() {
        this.resetBasicData();
    }

    //Function which is called whenver the component is updated
    componentDidUpdate(prevProps) {
    }

    getPhoto = (e) => {

        e.preventDefault();

        let file = e.target.files[0];
        console.log(file)

        let acceptedType = ['image/jpeg', 'image/jpg',
            'image/png', 'image/bmp'];

        if (acceptedType.indexOf(file.type) === -1) {
            alert('Please select image file only');
            return;
        }

        let that = this;
        file.doc_type = file.type;
        this.setState({
            imageBaseFile: file
        })

        let basic_data = this.state.basic_data;
        getBase64(file, function (img) {
            basic_data.profile_pic = img;
            that.setState({
                basic_data: basic_data,
            })
        });

    }

    handleExpandClose = (index) => {
        let all_data = this.state.all_data;
        all_data[index].isExpend = !all_data[index].isExpend;
        this.setState({
            all_data: all_data
        })
    }

    action = (type, index) => {
        let all_data = this.state.all_data;
        if(type === 'delete') {
            all_data.splice(index, 1);
            this.setState({
                all_data: all_data
            })
        }


        if(type === 'edit') {
            this.setState({
                isEditing: true,
                editingIndex: index,
                basic_data: Object.assign({}, all_data[index])
            })
        }

    }
    renderTableData() {
        return this.state.all_data.map((data, index) => {
            return (
                <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.password}</td>
                    <td>{data.mobile}</td>
                    <td>{data.address}</td>
                    <td >
                        <img style={{ width: 200 }} alt="profile pic" src={data.profile_pic || ''} />
                    </td>
                    {data.isExpend &&
                        <td onClick={() => this.handleExpandClose(index)}
                            >
                            <div style={{ display: 'flex', flexDirection: 'column',
                        textAlign: 'left' }}>
                                <div><b>Pincode : </b> {data.pincode}</div>
                                
                                <div><b>City : </b> {data.city}</div>
                                
                                <div><b>Dob : </b> {data.dob}</div>
                                
                                <div><b>State : </b> {data.state}</div>
                                <div><b>Discription : </b> {data.discription}</div>
                                
                            </div>
                            <button>
                                Close
                            </button>
                        </td>
                    }
                    {!data.isExpend &&
                        <td>
                            <button onClick={() => this.handleExpandClose(index)}>
                            
                            View more
                           </button>
                        </td>
                    }
                    <td>
                        <button
                            onClick={() => this.action('edit', index)}
                        >Edit
                        </button>
                        <button
                            onClick={() => this.action('delete', index)}
                        >Delete
                        </button>
                    </td>
                </tr>
            )
        })
    }


    handleChange = (name) => (event) => {

        let basic_data = this.state.basic_data;
        basic_data[name] = event.target.value;
        this.setState({
            basic_data: basic_data
        }, () => {
            console.log(this.state.basic_data)
        })
    }

    submit = () => {
        let all_data = this.state.all_data;

        if(this.state.isEditing) {
            all_data[this.state.editingIndex] =  this.state.basic_data;
        } else {
            all_data.push(this.state.basic_data);
        }
        
        this.resetBasicData();

        this.setState({
            all_data: all_data,
            isEditing: false
        })
    }

    render() {

        return (
            <div>
                <form noValidate autoComplete="off"
                    style={{ display: 'flex', flexDirection: 'column',
                    margin: '50px 0 0 0' }}
                >
                    <TextField
                        className="textfield-class"
                        id="name"
                        label="User Name"
                        value={this.state.basic_data.name}
                        onChange={this.handleChange('name')}
                    />
                    <TextField
                        className="textfield-class"
                        id="password"
                        label="Password"
                        type="password"
                        value={this.state.basic_data.password}
                        onChange={this.handleChange('password')}
                    />
                    <TextField
                        className="textfield-class"
                        id="mobile"
                        label="mobile"
                        value={this.state.basic_data.mobile}
                        onChange={this.handleChange('mobile')}
                    />
                    <TextField
                        className="textfield-class"
                        id="address"
                        label="Address"
                        value={this.state.basic_data.address}
                        onChange={this.handleChange('address')}
                    />
                    <TextField
                        className="textfield-class"
                        id="state"
                        label="Pin Code"
                        value={this.state.basic_data.pincode}
                        onChange={this.handleChange('pincode')}
                    />
                    <TextField
                        className="textfield-class"
                        id="city"
                        label="city"
                        value={this.state.basic_data.City}
                        onChange={this.handleChange('city')}
                    />
                    <TextField
                        className="textfield-class"
                        id="state"
                        label="State"
                        value={this.state.basic_data.state}
                        onChange={this.handleChange('state')}
                    />
                    <TextField
                        className="textfield-class"
                        id="dob"
                        type="date"
                        label="Date"
                        value={this.state.basic_data.dob || new Date('')}
                        onChange={this.handleChange('dob')}
                    />
                    <div style={{ margin: '0 0 0 60px', textAlign: 'left' }}>
                        <div>Discription</div>
                        <textarea name="discription"
                            onChange={this.handleChange('discription')}
                            value={this.state.basic_data.discription}
                        />
                    </div>
                    <div style={{ margin: '0 0 0 60px', textAlign: 'left' }}>
                        <div>Profile photo</div>
                        <input name="image" type="file" onChange={this.getPhoto} id="myFile" />
                    </div>


                </form>

                <div style={{textAlign: 'left'}}>
                    <button className="submit-button"
                        onClick={() => this.submit()}
                    >{!this.state.isEditing ? 'SUBMIT' : 'SUBMIT EDITING'}</button>
                </div>

                <div>
                    <h1 id='title'>Submitted data</h1>
                    <table id='students'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Password</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Profile</th>
                                <th>Extra</th>
                                <th>Action</th>
                            </tr>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
