import { zSignInTrpcInput } from '@ideaproject/backend/src/router/signIn/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'

export const SignInPage = () => {
  const [successMesageVisible, setSuccessMesageVisible] = useState(false)
  const [submittingError, setsubmittingError] = useState<string | null>(null)
  const signIn = trpc.signIn.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setsubmittingError(null)
        await signIn.mutateAsync(values)

        formik.resetForm()

        setSuccessMesageVisible(true)
        setTimeout(() => {
          setSuccessMesageVisible(false)
        }, 3000)
      } catch (error: any) {
        setsubmittingError(error.message)
      }
    },
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="password" label="Password" formik={formik} type="password" />

          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMesageVisible && <Alert color="green">Thanks for sign in!</Alert>}

          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
