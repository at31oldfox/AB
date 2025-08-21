import * as React from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'

const SelectValue = (props: React.ComponentProps<typeof SelectPrimitive.Value>) => (
  <SelectPrimitive.Value {...props} />
)

export { SelectValue }
