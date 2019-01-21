import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import DOMPurify from "dompurify";
import ReactModal from "react-responsive-modal";
import "./_modal.styl";

const props = {
  /* todo improve prop def */
  data: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const defaultProps = {
  data: null
};

const defaultModalProps = {
  closeIconClassName: "close",
  modalClassName: "node-modal",
  modalStyle: {
    background: "transparent",
    boxShadow: "none",
    border: "none"
  },
  overlayStyle: { padding: "0" }
};

const videoHeight = "350px";
class Modal extends Component {
  render() {
    const { open, onClose, data } = this.props,
      hasVideo = data && data.acf && data.acf.video.length > 0;

    let videoUrl = hasVideo && data.acf.video.split("src=")[1];
    videoUrl = hasVideo && videoUrl.substring(1, videoUrl.length).split('"')[0];

    const modalProps = { ...defaultModalProps, open, onClose };

    return !data ? null : (
      <div ref={"app__modal"}>
        <ReactModal {...modalProps}>
          <div className="app__modal-player">
            {open && hasVideo && (
              <div style={{ height: videoHeight }}>
                <ReactPlayer
                  className={"player"}
                  width={"100%"}
                  height={videoHeight}
                  url={videoUrl}
                />
              </div>
            )}
          </div>
          <div className="app__modal-info">
            <h2 style={{ color: data.color }} className={"hola"}>
              {data.hiddenLabel}
            </h2>
            <h4>
              {data.acf.anio} {data.acf.lugar && "- " + data.acf.lugar}{" "}
            </h4>
            <h5>
              Autores: {data.acf.nombre}{" "}
              {data.acf.profesion && "- " + data.acf.profesion}{" "}
            </h5>
            <p
              className={"app__modal-abstract"}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.acf.resena)
              }}
            />
          </div>
        </ReactModal>
      </div>
    );
  }
}

Modal.defaultProps = defaultProps;
Modal.propTypes = props;
export default Modal;
