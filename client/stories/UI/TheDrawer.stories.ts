import type { Meta, StoryObj } from '@storybook/vue3'
import TheDrawer from '../../components/Common/TheDrawer.vue'

const meta = {
  title: 'Drawer',
  parameters: {
    docs: {
      description: {
        component: 'Shows on small screens only'
      }
    }
  },
  component: TheDrawer,
  tags: ['autodocs'],
  argTypes: {
    show: {
      description: 'Shows the drawer'
    }
  }
} satisfies Meta<typeof TheDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Usual: Story = {
  render: (args) => ({
    components: { TheDrawer },
    template: '<TheDrawer v-bind="args">Text</TheDrawer>',
    setup() {
      return { args }
    }
  }),
  args: {
    show: true
  }
}
