import PropTypes from "prop-types";
export const nodes = PropTypes.arrayOf(
  PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        to: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
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
          video: PropTypes.string.isRequired
        }).isRequired,
        color: PropTypes.string.isRequired,
        hiddenLabel: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        wpId: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
).isRequired;
