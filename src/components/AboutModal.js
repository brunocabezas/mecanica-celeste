import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-responsive-modal';
import { ReactModalDefaultProps } from './Modal';
import './_about.styl';

const propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const AboutModal = ({ show, onClose }) => {
  const className = `about ${show ? 'about--visible' : ''}`;
  const modalProps = {
    ...ReactModalDefaultProps,
    open: show,
    onClose,
  };

  if (!show) {
    return null;
  }
  return (
    <ReactModal {...modalProps}>
      <div className={className}>
        <div className="about__video">
          <iframe
            title="Teaser Mecanica Celeste"
            src="https://www.youtube.com/embed/gDM5n8SZsAw"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="about__text">
          <p>
            Mecánica Celeste es un documental interactivo basado cápsulas
            audiovisuales que investigan sobre la astronomía y su relación con
            las artes, la literatura, la historia y la cultura popular en Chile.
            <br />
            El documental se presenta como una plataforma web interactiva, de
            estructura no lineal, que brinda la posibilidad de explorar y crear
            una narrativa propia a partir de los contenidos seleccionados por el
            visitante.
          </p>
          <p>
            Este proyecto es realizado gracias al trabajo de la Corporación
            Chilena de Video y Artes Electrónicas (CChV), al financiamiento del
            Fondo de Fomento Audiovisual y el Programa Otras Instituciones
            Colaboradoras, al apoyo de Conicyt Explora y gracias al aporte en
            material audiovisual de European Southern Observatory (ESO) y
            Observatorio ALMA.
          </p>
          <h3>Equipo realizador</h3>
          <dl>
            <dt>Dirección: Enrique Rivera</dt>
            <dt>Producción: Florencia Aspee</dt>
            <dt>Diseño: Bruno Cabezas </dt>
            <dt>Realización Audiovisual: Benjamín Matte</dt>
          </dl>
          <p>
            Para mayor información escribir a
            {' '}
            <a href="mailto:contacto@cchv.cl">contacto@cchv.cl</a>
          </p>
        </div>
        <div className="about__logos" />
      </div>
    </ReactModal>
  );
};

AboutModal.propTypes = propTypes;
export default AboutModal;
