import { zCreateIdeaTrpcInput } from '@ideaproject/backend/src/router/createIdea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textare'
import { trpc } from '../../lib/trpc'

export const NewIdeaPage = () => {
  const [successMesageVisible, setSuccessMesageVisible] = useState(false)
  const [submittingError, setsubmittingError] = useState<string | null>(null)
  const createIdea = trpc.createIdea.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      try {
        await createIdea.mutateAsync(values)

        formik.resetForm()

        setSuccessMesageVisible(true)
        setTimeout(() => {
          setSuccessMesageVisible(false)
        }, 3000)
      } catch (error: any) {
        setsubmittingError(error.message)
        setTimeout(() => {
          setsubmittingError(null)
        }, 3000)
      }
    },
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />

        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {!!submittingError && <div style={{ color: 'red' }}>{submittingError}</div>}
        {successMesageVisible && <div style={{ color: 'green' }}>Idea created!</div>}

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
        </button>
      </form>
    </Segment>
  )
}
