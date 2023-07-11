import type { Meta, StoryObj } from '@storybook/vue3'
import ImpresiseGuessNumber from '../components/GuessNumber/ImpresiseGuessNumber.vue'

const meta = {
  title: 'ImpresiseGuessNumber',
  component: ImpresiseGuessNumber,
  parameters: {
    docs: {
      description: {
        component: 'Impresise Guess Number Component'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ImpresiseGuessNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Usual: Story = {
  args: {}
}
