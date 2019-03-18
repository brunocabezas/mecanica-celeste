import PropTypes from 'prop-types';

export const node = PropTypes.shape({
  acf: PropTypes.shape({
    anio: PropTypes.string,
    biografia: PropTypes.string,
    documento: PropTypes.bool,
    duracion: PropTypes.string,
    imagenes: PropTypes.bool,
    lugar: PropTypes.string,
    nombre: PropTypes.string,
    profesion: PropTypes.string,
    resena: PropTypes.string,
    video: PropTypes.string,
  }),
  color: PropTypes.string,
  hiddenLabel: PropTypes.string,
  id: PropTypes.number,
  label: PropTypes.string,
  wpId: PropTypes.number,
});

export const nodes = PropTypes.arrayOf(
  PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        to: PropTypes.number.isRequired,
      }).isRequired,
    ),
    nodes: PropTypes.arrayOf(node),
  }).isRequired,
);

export const config = PropTypes.shape({
  width: PropTypes.string,
  height: PropTypes.string,
  physics: PropTypes.shape({ enabled: PropTypes.bool }),
  edges: PropTypes.shape({
    dashes: PropTypes.bool,
    arrows: PropTypes.shape({
      to: PropTypes.shape({ enabled: PropTypes.bool }),
    }),
    chosen: PropTypes.bool,
    color: PropTypes.shape({ color: PropTypes.string }),
    font: PropTypes.shape({ strokeWidth: PropTypes.number }),
    selectionWidth: PropTypes.number,
  }),
  nodes: PropTypes.shape({
    labelHighlightBold: PropTypes.bool,
    shape: PropTypes.string,
    size: PropTypes.number,
    font: PropTypes.shape({
      color: PropTypes.string,
      face: PropTypes.string,
    }),
  }),
  manipulation: PropTypes.shape({ enabled: PropTypes.bool }),
  interaction: PropTypes.shape({
    hover: PropTypes.bool,
    dragView: PropTypes.bool,
    dragNodes: PropTypes.bool,
    hoverConnectedEdges: PropTypes.bool,
  }),
});

export const modalData = PropTypes.shape({
  wpId: PropTypes.number,
  wpLabel: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number,
  acf: PropTypes.shape({
    nombre: PropTypes.string,
    profesion: PropTypes.string,
    anio: PropTypes.string,
    duracion: PropTypes.string,
    lugar: PropTypes.string,
    resena: PropTypes.string,
    biografia: PropTypes.string,
    video: PropTypes.string,
    imagenes: PropTypes.bool,
    documento: PropTypes.bool,
  }),
});
