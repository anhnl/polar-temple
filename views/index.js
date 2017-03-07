import React from 'react';
import Layout from './layout';

class Index extends React.Component {
  render () {
    return (
      <Layout title={this.props.title}>
        <h1>{this.props.title}</h1>
      </Layout>
    );
  }
}

module.exports = Index;