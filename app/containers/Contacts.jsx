// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../actions/contacts.jsx';

// Custom Components
import Contact from '../components/contacts/Contact.jsx';
import EmptyMessage from '../components/shared/EmptyMessage.jsx';

// Component
class Contacts extends Component {

  componentWillMount = () => {
    if (!this.props.contacts.loaded) {
      const {dispatch} = this.props;
      const getAllContacts = bindActionCreators(
        ActionCreators.getAllContacts,
        dispatch,
      );
      getAllContacts();
    }
  };

  deleteContact = _id => {
    // Dispatch Action
    const {dispatch} = this.props;
    const deleteContact = bindActionCreators(
      ActionCreators.deleteContact,
      dispatch,
    );
    deleteContact(_id);
  };

  componentWillUnmount() {
    ipc.removeAllListeners('confirmed-delete-contact');
  }

  // Render
  render = () => {
    const {contacts} = this.props;
    const contactsComponent = contacts.data.map((contact, index) => {
      return (
        <Contact
          key={contact._id}
          data={contact}
          index={index}
          deleteContact={this.deleteContact}
        />
      );
    });
    return (
      <div className="pageWrapper">
        <div className="pageHeader">
          <h4>All Contacts</h4>
        </div>
        {contacts.data.length === 0
          ? <EmptyMessage text="You dont't have any contacts yet!" />
          : <div className="pageContent">
              <div className="row">
                {contactsComponent}
              </div>
            </div>}
      </div>
    );
  };
}

// PropTypes Validation
Contacts.propTypes = {
  contacts: PropTypes.object.isRequired,
};

export default connect(state => ({
  contacts: state.ContactsReducer,
}))(Contacts);