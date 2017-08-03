import React, { Component } from 'react';

/**
 * Async load the components
 * 
 * @param {function} importComponent
 * @param {Component=} loadingComponent
 */
export default (importComponent, loadingComponent = null) => {
  return class AsyncComponent extends Component {
    static Component = null;

    static loadComponent() { // The function we call before rendering
      // Use the  import function to create a separated chunk and load it
      return importComponent()
        .then(module => module.default)
        .then((Component) => {
          AsyncComponent.Component = Component;
          return Component;
        });
    };

    mounted = false;

    state = {
      Component: AsyncComponent.Component
    };

    componentWillMount() {
      if(this.state.Component === null) {
        AsyncComponent.loadComponent()
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
