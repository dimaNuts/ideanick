import _ from 'lodash'

export const ideas = _.times(10, (i) => ({
  nick: `cool-nick-idea-${i}`,
  name: `Idea${i}`,
  description: `Idea${i} description...`,
  text: _.times(10, (j) => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(''),
}))
