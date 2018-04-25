/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

if (workbox) {
    console.log('Workbox is working');

    /**
     * Set precache
     */
    workbox.precaching.precacheAndRoute([]);

    /**
     * Articles Images cache
     */
    workbox.routing.registerRoute(
        // Define which files should be cached
        /(.*)articles(.*)\.(?:png|gif|jpg)/,

        // Define caching strategie
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60 //60 days
                })
            ]
        })
    );

    /**
     * Icon cache
     */
    workbox.routing.registerRoute(
        '/images/icon/*',
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'icon-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 5
                })
            ]
        })
    );


    /**
     * Articles cache
     */
    // Define articles cache strategy in const
    const articleHandler = workbox.strategies.networkFirst({
        cacheName: 'articles-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50
            })
        ]
    })

    // Register articles page cache
    workbox.routing.registerRoute(
        /(.*)article(.*)\.html/,
        // Call strategy from const
        args => {
            return articleHandler.handle(args).then(response => {
                // If there's no response return offline html
                // If it returns a 404 return 404 html
                // these pages are defined in the workbox-config.js precache
                if (!response) {
                    return caches.match('pages/offline.html');
                } else if (response.status === 404) {
                    return caches.match('pages/404.html');
                }
                return response;
            });
        }
    )

    /**
     * Posts cache
     */
    const postsHandler = workbox.strategies.cacheFirst({
        cacheName: 'posts-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50
            })
        ]
    });


    // Register posts cache
    workbox.routing.registerRoute(
        /(.*)post(.*)\.html/,
        args => {
            // the handle method returns a promise
            return postsHandler.handle(args).then(response => {
                if(response.status === 404) {
                    return caches.match('pages/404.html');
                }
                return response;

            }).catch(function() { return caches.match('pages/offline.html')});
        }
    )


    /**
     * Api comments cache
     * TODO:: find out to make sw cahce this response on first load.
     */
    workbox.routing.registerRoute(
        new RegExp('^https://jsonplaceholder.typicode.com/comments'),
        workbox.strategies.networkFirst({
            cacheName: 'api-comments-cache',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                })
            ]
        })
    )


} else {
    console.log('Workbox not working');
}