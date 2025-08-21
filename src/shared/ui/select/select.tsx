import * as React from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'

const Select = (props: React.ComponentProps<typeof SelectPrimitive.Root>) => (
  <SelectPrimitive.Root {...props} />
)

export { Select }
