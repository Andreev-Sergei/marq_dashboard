import Message from "../Message/Message";
import LessonTaskWrapper from "../Task/Task";
import {useDispatch, useSelector} from "react-redux";
import styles from './Block.module.sass'
import {GripVertical} from "react-bootstrap-icons";
import {reset, setDragType, setDrugItem} from "../../../store/reducers/dragSlice";
import {swapBlocks} from "../../../store/reducers/lessonSlice";
import {Alert, Button} from "react-bootstrap";
import BlockService from "../../../services/LessonServices/BlockService";



const Block = ({block}) => {
    const color = '#fff'
    const {type, dragItem} = useSelector(state => state.drag)
    const dispatch = useDispatch()

    function dragStartHandler(e, block) {
        if (type === 'BLOCK') dispatch(setDrugItem(block))
    }

    function dragEndHandler(e) {
        e.target.classList.remove(styles.hoveredBlock)
    }

    function dragOverHandler(e) {
        (type === 'BLOCK') && e.target.classList.add(styles.hoveredBlock)
        e.preventDefault()
    }

    function dragDropHandler(e, block) {
        e.preventDefault()
        if (type === 'BLOCK' && dragItem.blockId !== block.blockId) {
            dispatch(BlockService.swapBlocks(dragItem, block))
        }
        dispatch(reset())
        e.target.classList.remove(styles.hoveredBlock)
    }


    return (
        <div draggable={type === 'BLOCK'}
             onDragStart={(e) => dragStartHandler(e, block)}
             onDragLeave={(e) => dragEndHandler(e)}
             onDragEnd={(e) => dragEndHandler(e)}
             onDragOver={(e) => dragOverHandler(e)}
             onDrop={(e) => dragDropHandler(e, block)}
             key={block.blockId}
             style={{background: color, position: 'relative'}}
             className={"mb-2 pb-2 " + styles.block}>
            <p style={{
                position: 'absolute',
                top: 20,
                fontWeight: 600,
                right: 40,
                lineHeight: '32px',
                userSelect: 'none',
                opacity: '.3'
            }}>order: {block.order} block id {block.blockId}</p>
            <GripVertical
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 5
                }}
                size={32}
                role={"button"}
                onMouseDown={() => dispatch(setDragType('BLOCK'))}
            />
            <div className={styles.messages}
                 // onDragOver={(e) => dragOverHandlerMSG(e)}
            >
                {block.messages.map(item => <Message key={item?.id}
                                                     blockId={block.blockId}
                                                     item={item}/>
                )}
                {block.messages.length === 0 && <Message blockId={block.blockId}/>}
            </div>
            {block.userInput !== null
                ?
                <LessonTaskWrapper blockId={block.blockId} item={block.userInput}/>
                :
                <Alert variant={"danger"} >The block must contain the task </Alert>
            }
        </div>
    );
};

export default Block;