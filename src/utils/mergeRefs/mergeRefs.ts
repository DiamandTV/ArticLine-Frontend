
export function mergeRefs<T>(...refs:Array<React.Ref<T|null> | undefined>){
    return (node:T)=>{
        refs.forEach((ref)=>{
            if(!ref) return
            if(typeof ref==='function'){
                ref(node)
            } else if(ref != null){
                ref.current = node
            }
        })
    }
}