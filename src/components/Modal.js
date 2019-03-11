import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import ReactModal from 'react-responsive-modal';
import { node as nodeProps } from './app.props';
import './_modal.styl';

const MIN_VIDEO_HEIGHT = '350px';

const ReactModalDefaultProps = {
  closeIconClassName: 'close',
  modalClassName: 'modal',
  modalStyle: {
    background: 'transparent',
    boxShadow: 'none',
    position: 'relative',
    maxWidth: '100%',
    width: '100%',
    maxHeight: '100%',
    border: 'none',
  },
  overlayStyle: { padding: '0' },
};

export default class Modal extends Component {
  static propTypes = {
    data: nodeProps.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    videoHeight: MIN_VIDEO_HEIGHT,
  };


  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ videoHeight: window.innerWidth > 600 ? '100%' : MIN_VIDEO_HEIGHT });
  }

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
    const { loading, videoHeight } = this.state;
    const { open, data } = this.props;
    const hasVideo = data.acf && data.acf.video.length > 0;
    let videoUrl = hasVideo && data.acf.video.split('src=')[1];
    videoUrl = hasVideo && videoUrl.substring(1, videoUrl.length).split('"')[0];

    const modalProps = { ...ReactModalDefaultProps, open, onClose: this.onClose };

    if (!data.id) {
      return null;
    }

    return (
      <div ref="modal">
        <ReactModal {...modalProps}>
          <h1 className="modalTitle">{data.wpLabel}</h1>
          {loading && <span className="loader" />}
          {hasVideo && (
            <div className="modalPlayer">
              <ReactPlayer
                onReady={this.onPlayerRedy}
                className="player"
                height={videoHeight}
                width="100%"
                url={videoUrl}
              />
            </div>
          )}
        </ReactModal>
      </div>
    );
  }
}
