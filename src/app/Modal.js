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

    return !data ? null :
      <div ref={"app__modal"}>
      <ReactModal closeIconClassName="close" modalClassName={"modal"} modalStyle={modalStyle} open={open} onClose={onClose}>
        <div className="player">
          {open && <ReactPlayer width={"100%"} height={"350px"} url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />}
        </div>
        <div className="info">
          <h2 style={{color:data.color}} className={"hola"}>{data.hiddenLabel}</h2>
          <p>{data.description}</p>
        </div>
      </ReactModal>
      </div>;
  }
}

Modal.defaultProps = defaultProps;
Modal.propTypes = props;
export default Modal;