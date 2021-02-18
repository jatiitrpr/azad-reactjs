import React, {Component} from 'react';


import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default class UsersList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        openDialog: false,
      members: [{
        "id": "W012A3CDE",
        "real_name": "Egon Spengler",
        "tz": "America/Los_Angeles",
        "activity_periods": [{
                "start_time": "Feb 1 2020  1:33PM",
                "end_time": "Feb 1 2020 1:54PM"
            },
            {
                "start_time": "Mar 1 2020  11:11AM",
                "end_time": "Mar 1 2020 2:00PM"
            },
            {
                "start_time": "Mar 16 2020  5:33PM",
                "end_time": "Mar 16 2020 8:02PM"
            }
        ]
    },
    {
        "id": "W07QCRPA4",
        "real_name": "Glinda Southgood",
        "tz": "Asia/Kolkata",
        "activity_periods": [{
                "start_time": "Feb 1 2020  1:33PM",
                "end_time": "Feb 1 2020 1:54PM"
            },
            {
                "start_time": "Mar 1 2020  11:11AM",
                "end_time": "Mar 1 2020 2:00PM"
            },
            {
                "start_time": "Mar 16 2020  5:33PM",
                "end_time": "Mar 16 2020 8:02PM"
            }
        ]
    }
], 
timeData: []
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
  }




  renderTimes = (props, index) => {

    return(
        <tr key={index}>
  
          <td>{props.start_time}</td>
          <td>{props.end_time}</td>
        </tr>
        
      )
  }

  openDialog = (index) => {
    this.setState({
      timeData: this.state.members[index].activity_periods,
      openDialog: true
    })
  }

  handleClose = () =>   {
    this.setState({
      openDialog : false
    })
  }

  renderDialog = () => {

    console.log(this.state.timeData)
      return (
        <Dialog onClose={this.handleClose}
         aria-labelledby="simple-dialog-title" open={this.state.openDialog}>
      <DialogTitle id="simple-dialog-title">
          <div className="dialogueHead" >ACTIVITY PERIODS</div>
          </DialogTitle>
     
      <table id="time">
            <tbody>
              <tr>
                <th>START TIME</th>
                <th>END TIME</th>
              </tr>
              {this.state.timeData.map(this.renderTimes)}
            </tbody>
          </table>
     
      
            
    </Dialog>
      )
  }

  renderUsers = (props, index) => {
    return(
      <tr key={index}>

        <td>{props.real_name}</td>

        <td >
        <button onClick={() => this.openDialog(index)} >View calender</button> 
        </td>
        
      </tr>
      
    )
  }

  render() {
    return(
      <div>
        <table id="users">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Activity periods</th>
              </tr>
              {this.state.members.map(this.renderUsers)}
            </tbody>
          </table>

        
        {this.renderDialog()}
        
        
      </div>
    )    
  }

}
