import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
// import DOMPurify from 'dompurify';
import ReactModal from 'react-responsive-modal';
import { node as nodeProps } from './app.props';
import './_modal.styl';

const props = {
  /* todo improve prop def */
  data: nodeProps,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const defaultProps = {
  data: null,
};

const defaultModalProps = {
  closeIconClassName: 'close',
  modalClassName: 'modal',
  modalStyle: {
    background: 'transparent',
    boxShadow: 'none',
    maxWidth: '100%',
    width: '100%',
    border: 'none',
  },
  overlayStyle: { padding: '0' },
};

const videoHeight = '350px';
class Modal extends Component {
  state = {
    loading: true,
  };

  onPlayerRedy = (player) => {
    this.setState({ loading: false });
  };

  onClose = (e) => {
    this.setState({ loading: true });
    this.props.onClose(e);
  };

  render() {
    const { loading } = this.state;
    const { open, data } = this.props;
    const hasVideo = data && data.acf && data.acf.video.length > 0;
    let videoUrl = hasVideo && data.acf.video.split('src=')[1];
    videoUrl = hasVideo && videoUrl.substring(1, videoUrl.length).split('"')[0];

    const modalProps = { ...defaultModalProps, open, onClose: this.onClose };

    return !data ? null : (
      <div ref="modal">
        <ReactModal {...modalProps}>
          <h1 className="modal-title">{data.wpLabel}</h1>
          {loading && <span className="signal-loader" />}
          {hasVideo && (
            <div className="modal-player">
              <ReactPlayer
                onReady={this.onPlayerRedy} //eslint-disable-line
                className="player"
                width="100%"
                height={videoHeight}
                url={videoUrl}
              />
            </div>
          )}
        </ReactModal>
      </div>
    );
  }
}

Modal.defaultProps = defaultProps;
Modal.propTypes = props;
export default Modal;
