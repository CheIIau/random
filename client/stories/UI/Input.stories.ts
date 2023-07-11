import type { Meta, StoryObj } from '@storybook/vue3'
import InputComponent from '../../components/Common/UI/InputComponent.vue'

const meta = {
  component: InputComponent,
  title: 'Input',
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      description: 'Disables the input'
    }
  },
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof InputComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Usual: Story = {
  args: {}
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}
