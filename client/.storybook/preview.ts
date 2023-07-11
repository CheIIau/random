import '../assets/css/tailwind.css'
import type { Preview } from '@storybook/vue3'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
// /** @type { import('@storybook/vue3').Preview } */

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  }
}

export default preview
