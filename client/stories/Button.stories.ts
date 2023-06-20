import type { Meta, StoryObj } from '@storybook/vue3'
import ButtonComponent from '../components/Common/UI/ButtonComponent.vue'

const meta = {
  component: ButtonComponent,
  title: 'Button',
  tags: ['autodocs'],
  args: {
    label: 'Button',
    size: 'medium'
  },
  argTypes: {
    label: {
      description: 'Button text'
    },
    disabled: {
      description: 'Disables the button'
    },
    loading: {
      description: 'Show spinner before button text and disables the button'
    },
    size: {
      description: 'Button sizes',
      control: {
        type: 'select'
      },
      options: ['small', 'medium', 'large']
    }
  }
} satisfies Meta<typeof ButtonComponent>

// export default {
//   title: 'Button',
//   component: ButtonComponent,
//   tags: ['autodocs'],
//   argTypes: {
//     // backgroundColor: {
//     //   control: 'color'
//     // },
//     onClick: {}
//     // size: {
//     //   control: {
//     //     type: 'select'
//     //   },
//     //   options: ['small', 'medium', 'large']
//     // }
//   }
// }

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Loading: Story = {
  args: {
    loading: true
  }
}

export const Large: Story = {
  args: {
    size: 'large'
  }
}

export const Small: Story = {
  args: {
    size: 'small'
  }
}

export const Basic: Story = {
  render: (args) => ({
    components: { ButtonComponent },
    template: '<ButtonComponent v-bind="args" />',
    setup() {
      return { args }
    }
  }),
  args: {
    label: 'Button',
    size: 'medium'
  }
}
