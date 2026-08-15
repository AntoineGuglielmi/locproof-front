import { cn } from '@/shared/lib/className'
import { CSSProperties, Key } from 'react'

type ListItemProps = {
  index: number
}

type ListProps<T extends object, P extends object> = {
  className?: string
  items: Array<T>
  renderItem: React.ComponentType<T & P & ListItemProps>
  getKey: (item: T, index: number) => Key
  style?: CSSProperties
  itemExtraProps?: P
}

export default function List<T extends object, P extends object>({
  className,
  items,
  renderItem: Item,
  getKey,
  style,
  itemExtraProps,
}: ListProps<T, P>) {
  return (
    <ul
      className={cn('List', className)}
      {...(style ? { style } : {})}
    >
      {items.map((item, index) => {
        return (
          <li key={getKey(item, index)}>
            <Item
              {...({ ...item, ...itemExtraProps } as T & P)}
              index={index}
            />
          </li>
        )
      })}
    </ul>
  )
}
