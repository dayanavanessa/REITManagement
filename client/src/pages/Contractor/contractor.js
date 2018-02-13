import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import AdminForm from '../../components/FormComponent/AdminIssueForm.js';


class Admin extends Component {
  state = {
    requests: [],
    firstName: "",
    lastName: "",
    emailAddress: "",
    Description: "",
    contractorName: "",
    requestStatus: "",
    belowSection: "renter_request"

  };

  componentDidMount() {
    this.loadRequests();
  }

 loadRequests = () => {
   API.getRequests()
      .then((res) => {
        console.log('this is res ----', res);
        this.setState({ requests: res.data, firstName: "", lastName: "", emailAddress: "", Description: "", contractorName: "", requestStatus: "" })
      })
      .catch(err => console.log(err));
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    console.log('this is our name of the thing we are going to change', name);
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.contractorName && this.state.requestStatus) {
    
    console.log(this.state);

    let self = this;
     
     API.saveRequests({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email_address: this.state.emailAddress,
        request_detail: this.state.Description,
        contractor_name: this.state.contractorName,
        request_status: this.state.requestStatus
      })
      .then( function(res) {
        console.log(res);
        self.loadRequests();
      })
      .catch(err => console.log(err));
    }
  };
  handleBelowState = type => {
    console.log("Working!",type);
    this.setState({belowSection: type})
  }
  render() {  

    let htmlThatWillShow;

    const ShowARequestHtml = (
      <div class="collection">
        <a href="#!" class="collection-item">Entered Request 1</a>
        <a href="#!" class="collection-item active">Entered Request 2</a>
        <a href="#!" class="collection-item">Entered Request 3</a>
        <a href="#!" class="collection-item">Entered Request 4</a>
      </div>
    );
      
    const ShowInvoice = (
            <div class="collection">
        <a href="#!" class="collection-item">Invoice 1</a>
        <a href="#!" class="collection-item active">Invoice 2</a>
        <a href="#!" class="collection-item">Invoice 3</a>
        <a href="#!" class="collection-item">Invoice 4</a>
      </div>
    );


    if (this.state.belowSection === "renter_request") {
      htmlThatWillShow = ShowARequestHtml;
    } else if (this.state.belowSection === "show_invoice") {
      htmlThatWillShow = ShowInvoice;
    }

      const style = {
      buttonStyle: {
        width: "100%"
      },
      buttonLiStyle: {
        display: "inline-block",
        width: "50%"
      }
    }

    return (
      
    <Container fluid>
      <nav class="white" role="navigation">
        <div class="nav-wrapper container">
          <a href="/">
            <img id="logo-container" class="brand-logo" src="Logo2.png"/> 
          </a>
      
          <ul class="right hide-on-med-and-down">
            <li><a id="signOutLink" href="">Sign Out</a></li>
          </ul>

          <ul id="signOutlink" class="side-nav">
             <li><a href="">Sign Out</a></li>
          </ul>
      
          <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
        </div>
      </nav>

      
      <div id="index-banner" style={{height: '50px', minHeight: '200px'}} class="parallax-container">
        <div class="section no-pad-bot">
          <div class="container">
            <h1 class="header center teal-text text-lighten-2" >R.E.I.T Management</h1>
              <div class="row center"></div>
              <div class="row center"></div>
          </div>
        </div>
        <div style={{opacity: '0.5'}} class="parallax"><img src="background3.jpg" alt="Unsplashed background img 1"/></div>
      </div>

      <nav class="white" >
 <li style={style.buttonLiStyle}><button style={style.buttonStyle} class="btn-large waves-effect waves-light teal lighten-1" onClick={() => {this.handleBelowState("show_request")}}>Show Request</button></li>
        <li style={style.buttonLiStyle}><button style={style.buttonStyle} class="btn-large waves-effect waves-light teal lighten-1"  onClick={() => {this.handleBelowState("show_invoice")}}>Show Invoice</button></li>
      </nav>

       {htmlThatWillShow}

    </Container>

    );
  }
}

export default Admin;