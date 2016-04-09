/*
 * spa.upload.js
 *   Handle uplads of new images
 */

  'use strict';
  import React from 'react'
  import ReactDOM from 'react-dom'
  import DropZoneComponent from 'react-dropzone-component'
  import http from 'http'

  // begin local variables
  let
    // Configuration and setup for DropZoneComponent
    componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif', 'tif'],
      showFiletypeIcon: true,
      postUrl: '/uploadHandler'
    },
    eventHandlers = {
    // This one receives the dropzone object as the first parameter
    // and can be used to additional work with the dropzone.js
    // object
    init: null,
    // All of these receive the event as first parameter:
    drop: null,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: null,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecomplete: null
  },
    djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif,image/tiff"
    },

    // Legacy code
    configMap = {
      main_html : String()
        +     '<h2 class="content-head is-center">UPLOAD YOUR images</h2>'
        +     '<div class="pure-g">'

        +     '<div class="l-box-lrg pure-u-1 pure-u-md-2-5">'
        +       '<p>Description what user is suposed to do here</p>'
        +       '<form class="pure-form pure-form-stacked">'
        +         '<fieldset>'

        +           '<label for="name">Your Name</label>'
        +           '<input id="name" type="text" placeholder="Your Name">'

        +           '<label for="time">When was it taken</label>'
        +           '<input id="time" type="text" placeholder="Time">'

        +           '<label for="location">Where was the picture taken</label>'
        +           '<input id="location" type="text" placeholder="Location?">'

        +           '<button type="submit" class="pure-button">Upload</button>'
        +         '</fieldset>'

        +     '</div>'
    },

    stateMap = {
      $container : undefined
    },

    jqueryMap = {},
    initModule, serverURL, imageNames;
    // end local variables

  // React GraphQL playground - currently not yet working
  let CommentBox = React.createClass({
      loadCommentsFromServer: function(callback) {
        http.get({
          host: 'localhost:5000',
          path: '/oscon-data?query=query+{imageRecs{title}}'
      }, function(response) {
          // Continuously update stream with data
          var body = '';
          response.on('data', function(d) {
              body += d;
              console.log('Body: ' + body);
          });
          response.on('end', function() {

              // Data reception is done, do whatever with it!
              var parsed = JSON.parse(body);
              callback({
                  data: parsed
              });
          });
      }).bind(this)
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
      </div>
    );
  }
});
    // Figure out later where these belong
    // var React = require('react');
    // var Router = require('react-router');

    let setJqueryMap = function () {
      var $container = stateMap.$container;

      jqueryMap = {
        $container : $container
      };
    };

    // public methods
    export default function initModule ( $container ) {

      console.log("upload page reached");
      //set to taste
      //serverURL = 'http://localhost:4000';

      // load HTML and jquery collections
      stateMap.$container = $container;
      $container.hide();

      // Skeletal code to do GraphQL queries in the app
      var requestOptions = {
      host: '127.0.0.1:5000',
      path: '/oscon-test?query=query+{imageRecs{title}}'
      };

      let callback = function(response) {
        var data = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
          data += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
          console.log(data);
        });
      }

    http.request(requestOptions, callback).end();

    ReactDOM.render(
      <div>
      <h2>imageNames</h2>
      <DropZoneComponent  config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig} />
                    </div>,
      document.getElementById('upload-view')
    );
      // $container.html( configMap.main_html ).show();
      setJqueryMap();
      console.log('Does react exist? ' + typeof(React));
      console.log("upload initModule over");
    };
