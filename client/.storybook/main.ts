import * as path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { StorybookConfig } from '@storybook/vue3-vite'

// /** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-styling',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(config, { configType }) {
    config.plugins.push(
      /** @see https://github.com/aleclarson/vite-tsconfig-paths */
      tsconfigPaths({
        projects: [path.resolve(path.dirname(__dirname), 'tsconfig.json')]
      })
    )

    return config
  }
}
export default config
