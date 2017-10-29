import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'
import ReactModal from 'react-responsive-modal';

const props = {
  /* todo improve prop def */
  data : PropTypes.object,
  open : PropTypes.bool.isRequired,
  onClose : PropTypes.func.isRequired
};

const defaultProps = {
  data : null
};

const style = {
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : 'transparent',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
};

class Modal extends Component {

  render() {
    const {open, onClose, data} = this.props;

    // console.log(data);
    return !data && !open ? null :
      <ReactModal style={style} open={open} onClose={onClose} little>
        <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
        <div className="info">
          <h2>{data.hiddenLabel}</h2>
          <p>{data.description}</p>
        </div>
      </ReactModal>;
  }
}

Modal.propTypes = props;
export default Modal;