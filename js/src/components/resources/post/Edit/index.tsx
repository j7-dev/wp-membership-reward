import FormComponent from '@/components/resources/post/FormComponent'
import { Edit, useForm } from '@refinedev/antd'
import { useParams } from 'react-router-dom'

const index: React.FC<{
  postType: string
  children?: React.ReactNode
  handler?: () => void
  init?: () => void
}> = ({ postType = 'post', children, handler, init }) => {
  const { id } = useParams()

  const { formProps, formLoading, onFinish, saveButtonProps } = useForm({
    action: 'edit',
    resource: postType,
    redirect: 'list',
  })

  const handleUpdate = (values: any) => {
    if (!id) return
    const { title, content, ...rest } = values
    onFinish({
      title,
      content: content || '',
      meta: rest,
    })
  }

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <FormComponent
        formProps={formProps}
        formLoading={formLoading}
        handler={handler ? handler : handleUpdate}
        init={init}
      >
        {children}
      </FormComponent>
    </Edit>
  )
}

export default index
