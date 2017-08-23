// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Component
class ItemsRow extends Component {

  componentWillMount = () => {
    const {id, description, quantity, price, subtotal} = this.props.item;
    this.setState({
      id,
      description: description ? description : '',
      quantity: quantity ? quantity : 0,
      price: price ? price : 0,
      subtotal: subtotal ? subtotal : 0,
    });
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value}, () => {
      this.updateSubtotal();
    });
  };

  updateSubtotal = () => {
    let currentPrice = this.state.price;
    let currentQuantity = this.state.quantity;
    let currentSubtotal = currentPrice * currentQuantity;
    this.setState({subtotal: currentSubtotal}, () => {
      this.uploadRowState();
    });
  };

  uploadRowState = () => {
    const {updateRow} = this.props;
    updateRow(this.state);
  };

  render = () => {
    const { actions, hasHandler } = this.props;
    return (
      <div className="itemDiv">
        <div className="itemDescription">
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={e => this.handleInputChange(e)}
            placeholder="Description"
          />
        </div>

        <div className="itemPrice">
          <input
            name="price"
            type="number"
            value={this.state.price}
            onChange={e => this.handleInputChange(e)}
            placeholder="Price"
          />
        </div>

        <div className="itemQuantity">
          <input
            name="quantity"
            type="number"
            value={this.state.quantity}
            onChange={e => this.handleInputChange(e)}
            placeholder="Quantity"
          />
        </div>

        { (actions||hasHandler) &&
          <div className="itemActions">
            { actions &&
              <a
                href="#"
                className="itemRemoveBtn"
                onClick={() => this.props.removeRow(this.state.id)}>
                <i className="ion-close-circled" />
              </a>}
          </div>}
      </div>
    );
  };
}

ItemsRow.propTypes = {
  item:       PropTypes.object.isRequired,
  index:      PropTypes.number.isRequired,
  hasHandler: PropTypes.bool.isRequired,
  actions:    PropTypes.bool.isRequired,
  updateRow:  PropTypes.func.isRequired,
  removeRow:  PropTypes.func.isRequired,
  moveRow:    PropTypes.func.isRequired,
};

export default ItemsRow;