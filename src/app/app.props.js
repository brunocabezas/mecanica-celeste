import PropTypes from 'prop-types';

export const node = PropTypes.shape({
  acf: PropTypes.shape({
    anio: PropTypes.string.isRequired,
    biografia: PropTypes.string.isRequired,
    documento: PropTypes.bool.isRequired,
    duracion: PropTypes.string.isRequired,
    imagenes: PropTypes.bool.isRequired,
    lugar: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    profesion: PropTypes.string.isRequired,
    resena: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
  hiddenLabel: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  wpId: PropTypes.number.isRequired,
}).isRequired;

export const nodes = PropTypes.arrayOf(
  PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        to: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    nodes: PropTypes.arrayOf(node).isRequired,
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
