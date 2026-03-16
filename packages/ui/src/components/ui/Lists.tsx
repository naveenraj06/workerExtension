import { cn } from '../../lib/utils'

const Lists = ({children, className}:any ) => {
    return <div className={cn('lists', className)}>
        {children}
    </div>
}

const ListsItem = ({children, className}:any) => {
    return <div className={cn('lists-item', className)}>
        {children}
    </div>
}

export {
    Lists,
    ListsItem
}