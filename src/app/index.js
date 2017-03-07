import React, { Component, PropTypes } from 'react';
import axios from 'axios';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { ads: [], ads_metrics: []};
	}
	componentDidMount() {
		var self = this;
		var ads = [];
		var ads_metrics = [];

		axios.get('http://localhost:8888/ads')
		  .then(function (response) {
		    ads = response.data.ads;
		    axios.get('http://localhost:8888/ads_metrics')
				  .then(function (response) {
				    ads_metrics = response.data;
				    self.setState({ ads: ads, ads_metrics: ads_metrics });
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
  render() {

    return (
      <div>
        <AdsTable
        	ads={this.state.ads}
        	ads_metrics={this.state.ads_metrics} />
      </div>
    );
  }
}

App.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

class AdsTable extends React.Component {
	render() {
		var columnNames = [];
		var listAds = this.props.ads.map((ad) =>
			<div className="fixed-row">{ad.name}</div>
		);

		if (this.props.ads_metrics.column_names != undefined) {
			columnNames = this.props.ads_metrics.column_names.map((cn) =>
				<div className="moving-col-name">{cn}</div>
			);
		}
		
		console.log(this.props.ads_metrics.column_names);
		return(
			<div className="ads-table">
				<div className="fixed-col">
					<div className="fixed-row">Ads Name</div>
					{listAds}
				</div>
				<div className="moving-cols">{columnNames}</div>
			</div>
		)
	}
}