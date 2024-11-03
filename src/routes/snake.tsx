import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/snake')({
  component: () => <div>Hello /snake!</div>,
})
