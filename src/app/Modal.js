import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'
import ReactModal from 'react-responsive-modal';
import './Modal.styl';

const props = {
  /* todo improve prop def */
  data : PropTypes.object,
  open : PropTypes.bool.isRequired,
  onClose : PropTypes.func.isRequired
};

const defaultProps = {
  data : null
};

const modalStyle = {
  background: "transparent",
  boxShadow: "none",
  border : "none"
};

class Modal extends Component {

  render() {
    const {open, onClose, data} = this.props;

    // console.log(data);
    return !data ? null :
      <ReactModal modalStyle={modalStyle} open={open} onClose={onClose}>
        <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
        <div className="info">
          <h2 className={"hola"}>{data.hiddenLabel}</h2>
          <p>{data.description}</p>
        </div>
      </ReactModal>;
  }
}

Modal.defaultProps = defaultProps;
Modal.propTypes = props;
export default Modal;