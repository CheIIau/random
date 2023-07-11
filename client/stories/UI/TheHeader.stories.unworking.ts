import type { Meta, StoryObj } from '@storybook/vue3'
import TheHeader from '../../components/Common/TheHeader.vue'

const meta = {
  title: 'Header',
  component: TheHeader,
  parameters: {
    docs: {
      description: {
        component: 'Regular header'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof TheHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Usual: Story = {
  args: {}
}

// This story does not work because storybook can not handle useRouter import from nuxt. 
// Need to either disable the story or replace useRouter and links in Header component with static links
