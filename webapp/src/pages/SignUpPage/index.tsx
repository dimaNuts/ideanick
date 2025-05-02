import { zSignUpTrpcInput } from '@ideaproject/backend/src/router/signUp/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'

export const SignUpPage = () => {
  const [successMesageVisible, setSuccessMesageVisible] = useState(false)
  const [submittingError, setsubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Passwords must be the same',
              path: ['passwordAgain'],
            })
          }
        })
    ),
    onSubmit: async (values) => {
      try {
        setsubmittingError(null)
        await signUp.mutateAsync(values)

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
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="password" label="Password" formik={formik} type="password" />
          <Input name="passwordAgain" label="Password again" formik={formik} type="password" />

          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMesageVisible && <Alert color="green">thanks for sign up!</Alert>}

          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
