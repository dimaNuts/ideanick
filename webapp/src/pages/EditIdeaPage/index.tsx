//
import { zUpdateIdeaTrpcInput } from '@ideaproject/backend/src/router/updateIdea/input'
//
import pick from 'lodash/pick'

import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textare'

import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'
import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = useParams() as EditIdeaRouteParams
    return trpc.getIdea.useQuery({
      ideaNick,
    })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  checkExistsMessage: 'Idea not found',
  checkAccess: ({ queryResult, ctx }) => !!ctx.me && ctx.me.id === queryResult.data.idea?.authorId,
  checkAccessMessage: 'An idea can only be edited by the author',
  setProps: ({ queryResult }) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    idea: queryResult.data.idea!,
  }),
})(({ idea }) => {
  const navigate = useNavigate()

  const updateIdea = trpc.updateIdea.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaID: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaID: idea.id, ...values })
      await navigate(getViewIdeaRoute({ ideaNick: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })
  return (
    <Segment title={`Edit Idea: ${idea.nick} `}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />

          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
