/** @jsx React.DOM */
'use strict';

require.config({
    baseUrl: 'scripts',
    paths: {
	react: 'script/react.min'
    },
    shim: {
	react: {
	    exports: 'React'
	}
    }
});

require(['app'], function (App) {
    // use app here

    React.renderComponent(
	    <App url="comments.json" pollingInterval={2000} />,
	document.getElementById('app')
    );
});

