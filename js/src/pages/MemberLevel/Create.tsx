import { Create } from '@/components/resources/post'
import FormComponent from './FormComponent'

const index = () => {
  return (
    <Create postType="member_lv">
      <FormComponent />
    </Create>
  )
}

export default index
