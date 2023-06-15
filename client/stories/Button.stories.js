import ButtonComponent from '../components/Common/UI/ButtonComponent.vue'

export default {
  title: 'Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: {
    //   control: 'color'
    // },
    onClick: {}
    // size: {
    //   control: {
    //     type: 'select'
    //   },
    //   options: ['small', 'medium', 'large']
    // }
  }
}

export const Primary = {
  args: {
    label: 'Button'
  }
}

export const Disabled = {
  args: {
    disabled: true,
    label: 'Button'
  }
}

export const Loading = {
  args: {
    loading: true,
    label: 'Button'
  }
}
