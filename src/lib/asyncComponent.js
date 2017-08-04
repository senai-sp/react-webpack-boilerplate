import React, { Component } from 'react';

/**
 * Async load the components
 * 
 * @param {function} importComponent Impport function
 * @param {Component=} loadingComponent
 */
export default (importComponent, loadingComponent = null) => {
  return class AsyncComponent extends Component {
    mounted = false;

    state = {
      Component: null,
    };

    loadComponent() { // The function we call before rendering
      // Use the  import function to create a separated chunk and load it
      return importComponent()
        .then(module => module.default)
        .then((Component) => {
          this.setState((state) => ({
            Component,
          }));
          return Component;
        });
    };

    componentWillMount() {
      if(this.state.Component === null) {
        this.loadComponent()
          .then((Component) => {
            if(this.mounted) {
              this.setState({ Component });
            }
          });
      }
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const { Component } = this.state;

      if(Component !== null) {
        return (<Component { ...this.props } />);
      }
      return loadingComponent;
    }
  };
}
