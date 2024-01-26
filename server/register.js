'use strict';

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'prerender',
    plugin: 'preview-component-frame',
    type: 'string',
  });
};  
