import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-responsive-modal';

const props = {
  data : PropTypes.array.isRequired,
  open : PropTypes.bool.isRequired,
  onClose : PropTypes.func.isRequired
};

class Modal extends Component {

  render() {
    const {open, onClose, data} = this.props;

    return (
      <ReactModal open={open} onClose={onClose} little>
        modal of item
      </ReactModal>
    );
  }
}

Modal.propTypes = props;
export default Modal;