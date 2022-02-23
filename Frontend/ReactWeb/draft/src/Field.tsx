import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import atbd1 from './lib/atbd1.png'
import atbd2 from './lib/atbd2.png'
import atbd3 from './lib/atbd3.png'
import Controller from "./Controller"
import { useState } from "react"

function Node(props: any) {
    let node = null
    let color = ""
    let ATBDchosen: any = null
    let size = props.size
    let progheight = size * 0.1
    let progwidth = size * 0.8

    if (((props.x + props.y) % 2) === 0)
        color = "bg-rose-300 flex justify-center"
    else
        color = "bg-rose-400 flex justify-center"

    if (props.select)
        color += " border-4 border-green-400"

    if (props.type === 'atbd1') {
        ATBDchosen = atbd1
    } else if (props.type === 'atbd2') {
        ATBDchosen = atbd2
    } else if (props.type === 'atbd3') {
        ATBDchosen = atbd3
    }

    let image : any = null
    if (props.type !== 0)
        image = <img src={ATBDchosen} alt="" style={{ height: size }} />
    else
        image = null

    node = (
        <div className={color + ' flex flex-col relative items-center'} style={{ height: size, width: size }}
            onClick={() => {
                if(image === null) {
                    Controller.sendPos({
                        posX_placement: props.x,
                        posY_placement: props.y,
                    })
                }
            }}>

            <div>
                {props.type !== 0 && <progress className = 'fixed rotate-45' style = {{transform: "translate(-50%,-80%)",height:progheight,width:progwidth}}value={props.hp} max={props.hpMax}></progress>}
            </div>
            <div>
                {image}
            </div>
        </div>
    )
    return (
        <div>
            {node}
        </div>
    )
}

function Field(props: any) {

    const m = props.m
    const n = props.n

    let scale = 0.7
    let fullWidth = 1920 * scale
    let fullHeight = 1080 * scale
    let size = fullWidth / m < fullHeight / n ? fullWidth / m : fullHeight / n

    // let width = fullWidth / m
    // let height = fullHeight / n

    const [selectX, setSelectX] = useState<number>(-1)
    const [selectY, setSelectY] = useState<number>(-1)
    const [clickState, setClickState] = useState<number>(-1)

    Controller.getPosX().then(resp => setSelectX(resp))
    Controller.getPosY().then(resp => setSelectY(resp))
    Controller.getClickState().then(resp => setClickState(resp))

    const createGrid = () => {
        const Grid = []

        const px = props.px
        const py = props.py
        const type = props.t

        for (let i = 0; i < m; ++i) {
            const currentRow = []
            for (let j = 0; j < n; ++j) {
                currentRow.push(<div />)
            }
            Grid.push(currentRow)
        }

        return (
            <div className="flex">
                {Grid.map((row, rowId) => {
                    return (
                        <div key={rowId}>
                            {row.map((node, nodeId) => {
                                let selected = false
                                if (selectX === nodeId && selectY === rowId && clickState !== 0)
                                    selected = true

                                for (let i = 0; i < px.length; ++i) {
                                    if (px[i] === nodeId && py[i] === rowId) {
                                        return (
                                            <div className=''>
                                                <Node x={nodeId} y={rowId} size={size} type={type[i]} select={false} hp={props.hp[i]} hpMax={props.hpMax[i]} />
                                            </div>
                                        )
                                    }
                                }
                                return (
                                    <Node x={nodeId} y={rowId} size={size} type={0} select={selected} />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (

        <div className="flex justify-center">
            <TransformWrapper doubleClick={{ disabled: true }}>
                <TransformComponent>
                    <div className="">
                        {createGrid()}
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>

    )

}

export default Field