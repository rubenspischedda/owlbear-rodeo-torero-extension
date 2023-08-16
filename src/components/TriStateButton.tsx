export default function TriStateButton({ state, setState, children }: { state: boolean|undefined, setState: (active: boolean|undefined) => void, children: React.ReactNode }) {
    return (
        <div onClick={() => {
            if (state === true) setState(false)
            else if (state === false) setState(undefined)
            else setState(true)
        }} className='rounded px-2 py-1 flex items-center space-x-2 cursor-pointer text-white bg-slate-400 hover:bg-slate-500 text-xs'>
            <div className='rounded-md h-3 w-3'>
                <div className={`h-full w-full rounded-full ${state === true ? 'bg-green-500' : state === false ? 'bg-red-500' : 'bg-gray-500'}`} />
            </div>
            <div>{children}</div>
        </div>
    )
}
