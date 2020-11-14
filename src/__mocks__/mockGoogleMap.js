/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

export default class MockGoogleMap extends Component {
  constructor(props) {
    super(props);
    this.getBounds = this.getBounds.bind(this);
  }

  componentDidMount() {
    this.props.onTilesLoaded();
  }

  getBounds() {
    return {
      getNorthEast: () => ({
        lat: () => 1,
        lng: () => 1,
      }),
      getSouthWest: () => ({
        lat: () => 1,
        lng: () => 1,
      }),
    };
  }

  render() {
    return (
      <div>
        Maps
        {this.props.children}
      </div>
    );
  }
}
