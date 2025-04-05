export const Textarea = ({
  label,
  name,
  state,
  setState,
}: {
  label: string
  name: string
  state: Record<string, any>
  setState: React.Dispatch<React.SetStateAction<any>>
}) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        onChange={(e) => {
          setState({ ...state, [name]: e.target.value })
        }}
        value={state[name]}
        name={name}
        id={name}
      />
    </div>
  )
}
