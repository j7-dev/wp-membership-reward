import FormComponent from '@/components/resources/post/FormComponent'
import { useCreate, HttpError } from '@refinedev/core'
import { Create, useForm } from '@refinedev/antd'
import { notification } from 'antd'
import { ArgsProps } from 'antd/es/notification/interface'
import { TPost } from '@/types'

const index: React.FC<{
  postType?: string
  notificationConfig?: ArgsProps
}> = ({ notificationConfig = {}, postType = 'post' }) => {
  const { mutate: create } = useCreate()
  const { form, formProps, saveButtonProps, formLoading } = useForm<
    TPost,
    HttpError,
    TPost
  >()
  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        create(
          {
            resource: postType,
            values,
          },
          {
            onSuccess: () => {
              form.resetFields()
              notification.success({
                key: `create-${postType}`,
                message: `Create ${postType} successfully`,
                ...notificationConfig,
              })
            },
          },
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Create saveButtonProps={saveButtonProps}>
      <FormComponent
        formType="create"
        formProps={formProps}
        formLoading={formLoading}
        handler={handleCreate}
      />
    </Create>
  )
}

export default index
