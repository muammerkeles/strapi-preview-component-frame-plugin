'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-preview-component-frame-plugin')
      .service('myService')
      .getWelcomeMessage();
  },
});
