import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import getTrad from './utils/getTrad';
const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import('./pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });

    app.customFields.register({
      name: "prerender",
      pluginId: "preview-component-frame",  
      type: "string", // the color will be stored as a string
      intlLabel: {
        id: getTrad("preview-component-frame.preview.label"),
        defaultMessage: "Live Component",
      },
      intlDescription: {
        id: getTrad("preview-component-frame.preview.description"),
        defaultMessage: "Enter Name",
      },
      components: {
        Input: async () => import("./components/prerender"),
      },
      options: {
        // declare options here
        base: [
          {
            sectionTitle: null,
            items: [
              {
                name: 'options.url',//name of an related field
                type: 'text',//input type
                intlLabel: {
                  id: getTrad('url.text'),
                  defaultMessage: 'Confronting page name of this component',//label for the info field
                },
                description: {
                  id: getTrad('url.description'),
                  defaultMessage:
                    "Leave empty if component-name is same with confront page"
                },
                placeholder: {
                  id: getTrad('url.placeholder'),
                  defaultMessage: ' ',
                },
              },
            ],
          },
        ],


      },
    });


  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
