'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const alfy = require('alfy');
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;

const photos = [];

const unsplash = new Unsplash({
    applicationId: "42ccba9c5c6a8a89f072e704ba38b8a607e4976c3c186126527ea549ae869c7d",
    secret: "a72e754936ef95b13b2edefa90fcdba6ce119f2e61e8673de21244e09c6d8791",
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
    // bearerToken: "xxxxx"
});

unsplash.search.photos(alfy.input, 1, 20)
    .then(toJson)
    .then(json => {
        const items = json.results
            .map(x => ({
                title: x.description || x.id,
                subtitle: `Photo by ${x.user.name} on Unsplash`,
                arg: x.urls.raw,
                mods: {
                    cmd: {
                        subtitle: 'press ⏎ to copy to clipboard',
                        arg: x.urls.raw
                    },
                    alt: {
                        subtitle: 'press ⏎ to read aloud',
                        arg: x.urls.raw
                    },
                    ctrl: {
                        subtitle: `press ⏎ to open in browser`,
                        arg: x.links.html
                    }
                },
                icon: {
                    path: x.urls.thumb
                },
                quicklookurl: x.urls.small,
                text: {
                    copy: x.urls.raw,
                    largetype: x.urls.raw
                }
            }));

        alfy.output(items);
    });
