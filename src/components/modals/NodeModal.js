import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import ReactModal from 'react-responsive-modal';
import { node as nodeProps } from '../app.props';
import './_nodeModal.styl';

const MIN_VIDEO_HEIGHT = '350px';

export const ReactModalDefaultProps = {
  closeIconClassName: 'close',
  modalClassName: 'modal',
  modalStyle: {
    background: 'transparent',
    boxShadow: 'none',
    boxSizing: 'border-box',
    position: 'relative',
    maxWidth: '100%',
    width: '100%',
    maxHeight: '100%',
    border: 'none',
  },
  overlayStyle: { padding: '0' },
};
export default class NodeModal extends Component {
  static propTypes = {
    data: nodeProps.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    open: this.props.open,
    loading: true,
    videoHeight: MIN_VIDEO_HEIGHT,
  };

  componentDidMount = () => {
    this.updateWindowDimensions();
    this.setStateFromProps(this.props);
    window.addEventListener('resize', this.updateWindowDimensions);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  };

  componentWillReceiveProps = (nextProps) => {
    this.setStateFromProps(nextProps);
  };

  setStateFromProps = (props) => {
    const { data, open } = props;
    const hasVideo = data && data.acf && data.acf.video;
    this.updateWindowDimensions();
    if (!hasVideo && open) {
      console.warn(
        `Wrong/Invalid video url for '${data.label}' video`,
        data.acf.video,
      );
      this.setState({ open: false });
    } else if (open !== this.state.open) {
      this.setState({ open });
    }
  };

  updateWindowDimensions = () => {
    this.setState({
      videoHeight: window.innerWidth > 600 ? '100%' : MIN_VIDEO_HEIGHT,
    });
  };

  onPlayerRedy = () => {
    this.setState({ loading: false });
  };

  render() {
    const { loading, videoHeight, open } = this.state;
    const { data, onClose } = this.props;
    console.log('this.props', this.props);

    if (!open || !data.id) return null;

    // Video url is obtained from node data as an iframe string e.g.
    // <iframe
    //   src="https://player.vimeo.com/video/175792812?app_id=122963"
    //   width="640"
    //   height="360"
    //   frameBorder="0"
    //   title="Sugar molecules in the gas surrounding a young Sun-like star (zoom)"
    //   allow="autoplay; fullscreen"
    //   allowFullScreen
    // />
    const strAfterSrc = data.acf.video.split('src=')[1];
    const videoUrl = strAfterSrc.substring(1, strAfterSrc.length).split('"')[0]; // eslint-disable-line

    const modalProps = {
      ...ReactModalDefaultProps,
      open,
      onClose,
    };

    return (
      <div ref="modal">
        <ReactModal {...modalProps}>
          <h1 className="modalTitle">{data.wpLabel}</h1>
          {loading && <span className="loader" />}
          <div className="modalPlayer">
            <ReactPlayer
              onReady={this.onPlayerRedy}
              className="player"
              height={videoHeight}
              width="100%"
              url={videoUrl}
              playing
            />
          </div>
        </ReactModal>
      </div>
    );
  }
}
