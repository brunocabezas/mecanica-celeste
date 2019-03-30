# Mecánica Celeste

Space nodes with Chilean astrology videos.

![Mecanica Celeste](mecanica-celeste.png?raw=true 'Mecanica Celeste')

## Development

This is a [Create React App](https://github.com/facebookincubator/create-react-app) after [ejecting](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject). [react-graph-vis network module](https://github.com/crubier/react-graph-vis) is used as main visualization library.

[Parcel.js](https://parceljs.org) is the tool used to build to production and serves app on a development env.

These instructions will get you a copy of the project up and running on your local machine for development and deployment purposes.

### Installing

Before all, install _npm_ dependencies:

```
npm install
```

### Development server

This will start the app on `http://localhost:1234`:

```
npm start
```

_Linting_ (with [airbnb config]('.eslintrc.json')) is possible by running:

```
npm run lint
```

### Build

This will build the app on `parcel-build/`:

```
npm run build
```
