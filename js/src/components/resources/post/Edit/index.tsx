import FormComponent from '@/components/resources/post/FormComponent'
import { useUpdate, HttpError } from '@refinedev/core'
import { Edit, useForm } from '@refinedev/antd'
import { TPost } from '@/types'
import { notification } from 'antd'
import { ArgsProps } from 'antd/es/notification/interface'
import { useParams } from 'react-router-dom'

const index: React.FC<{
  postType: string
  notificationConfig?: ArgsProps
}> = ({ postType = 'post', notificationConfig = {} }) => {
  const { mutate: update } = useUpdate()
  const { id } = useParams()

  const { form, formProps, saveButtonProps, formLoading } = useForm<
    TPost,
    HttpError,
    TPost
  >()

  const handleUpdate = () => {
    if (!id) return
    form
      .validateFields()
      .then((values) => {
        update(
          {
            resource: postType,
            values,
            id,
          },
          {
            onSuccess: () => {
              form.resetFields()
              notification.success({
                key: `edit-${postType}`,
                message: `Edit ${postType} successfully`,
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
    <Edit saveButtonProps={saveButtonProps}>
      <FormComponent
        formType="edit"
        formProps={formProps}
        formLoading={formLoading}
        handler={handleUpdate}
      />
    </Edit>
  )
}

export default index
