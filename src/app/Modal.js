import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import ReactModal from 'react-responsive-modal';
import { node as nodeProps } from './app.props';
import './_modal.styl';

const props = {
  /* todo improve prop def */
  data: nodeProps.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const defaultProps = {};

const defaultModalProps = {
  closeIconClassName: 'close',
  modalClassName: 'modal',
  modalStyle: {
    background: 'transparent',
    boxShadow: 'none',
    position: 'relative',
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    border: 'none',
  },
  overlayStyle: { padding: '0' },
};

const videoHeight = '350px';
class Modal extends Component {
  state = {
    loading: true,
  };

  onPlayerRedy = () => {
    this.setState({ loading: false });
  };

  onClose = (e) => {
    const { onClose } = this.props;
    // Set loading to true when closing; to show loader first next time is opened
    this.setState({ loading: true });
    onClose(e);
  };

  render() {
    const { loading } = this.state;
    const { open, data } = this.props;
    const hasVideo = data.acf && data.acf.video.length > 0;
    let videoUrl = hasVideo && data.acf.video.split('src=')[1];
    videoUrl = hasVideo && videoUrl.substring(1, videoUrl.length).split('"')[0];

    const modalProps = { ...defaultModalProps, open, onClose: this.onClose };

    return !data.id ? null : (
      <div ref="modal">
        <ReactModal {...modalProps}>
          <h1 className="modal-title">{data.wpLabel}</h1>
          {loading && <span className="signal-loader" />}
          {hasVideo && (
            <div className="modal-player">
              <ReactPlayer
                onReady={this.onPlayerRedy}
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
