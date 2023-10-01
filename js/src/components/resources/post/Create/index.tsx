import FormComponent from '@/components/resources/post/FormComponent'
import { Create, useForm } from '@refinedev/antd'
import { currentUserId } from '@/utils'

const index: React.FC<{
  postType?: string
  children?: React.ReactNode
  handler?: (_values: any) => void
  init?: () => void
}> = ({ postType = 'post', children, handler, init }) => {
  const { formProps, formLoading, onFinish, saveButtonProps } = useForm({
    action: 'create',
    resource: postType,
    redirect: 'list',
  })

  const handleCreate = (values: any) => {
    const { title, content, ...rest } = values
    onFinish({
      title,
      content: content || '',
      status: 'publish',
      author: currentUserId,
      meta: rest,
    })
  }

  return (
    <Create saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <FormComponent
        formProps={formProps}
        formLoading={formLoading}
        handler={handler ? handler : handleCreate}
        init={init}
      >
        {children}
      </FormComponent>
    </Create>
  )
}

export default index
