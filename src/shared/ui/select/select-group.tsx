import * as React from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'

const SelectGroup = (props: React.ComponentProps<typeof SelectPrimitive.Group>) => (
  <SelectPrimitive.Group {...props} />
)

export { SelectGroup }
