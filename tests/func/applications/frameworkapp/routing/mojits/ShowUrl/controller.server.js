/*
 * Copyright (c) 2011 Yahoo! Inc. All rights reserved.
 */
YUI.add('ShowUrl', function (Y, NAME) {

/**
 * The ShowUrl module.
 *
 * @module ShowUrl
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The action context that provides access
         *        to the Mojito API.
         */
        index: function (ac) {
            var mojitName = ac.params.getFromUrl('mojit_name'),
                mojitAction = ac.params.getFromUrl('mojit_action'),
                mojitUrlParams = ac.params.getFromUrl('mojit_urlparams'),
                mojitUrl = ac.params.getFromUrl('mojit_url'),
                mojitVerb = ac.params.getFromUrl('mojit_verb'),
                nameExists = mojitName ? "YES" : "NO",
                actionExists = mojitAction ? "YES" : "NO",
                urlparamsExists = mojitUrlParams ? "YES" : "NO",
                urlExists = mojitUrl ? "YES" : "NO",
                url,
                data,
                matchroute;

			// console.log(ac.params.params);
            console.log("********************** mojitName     : " + mojitName);
            console.log("********************** mojitAction   : " + mojitAction);
            console.log("********************** mojitUrlParams: " + mojitUrlParams);
            console.log("********************** mojitUrl      : " + mojitUrl);
            console.log("********************** mojitVerb     : " + mojitVerb);

            if (nameExists === "YES" && actionExists === "YES") {
                url = "";
                try {
                    if (urlparamsExists === "YES") {
                        url = ac.url.make(mojitName, mojitAction, {
                            id: 'MySpecialRoute'
                        }, mojitVerb, {
                            u: mojitUrlParams
                        });
                    } else {
                        url = ac.url.make(mojitName, mojitAction);
                    }
                } catch (err1) {
                    url = err1;
                }
                data = {
                    url: url,
                    name: mojitName,
                    action: mojitAction
                };
                //ac.http.setHeader('content-type', 'text/html');
                ac.done(data);
            } else if (urlExists === "YES") {
                matchroute = "";
                try {
                    matchroute = ac.url.find(mojitUrl, mojitVerb);
                } catch (err2) {
                    url = err2;
                }
                console.log(matchroute);
                if (matchroute !== null) {
                    data = {
                        url: mojitUrl,
                        verbs: matchroute.verbs.GET,
                        call: matchroute.call,
                        name: matchroute.name,
                        params: matchroute.params.secret
                    };
                } else {
                    data = {
                        url: mojitUrl
                    };
                }
                ac.done(data);
            }
        }
    };

}, '0.0.1', {requires: [
    'mojito',
    'mojito-url-addon',
    'mojito-params-addon',
    'mojito-http-addon']});
