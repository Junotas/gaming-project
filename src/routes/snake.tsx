import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/snake')({
  component: () => <div>you can't see this text, very sad!</div>,
})
