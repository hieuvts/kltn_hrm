import React from "react";
import Header from "../components/Workplace-Header";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Item from "../components/WorkPlace-Item";
import Col from "../components/WorkPlace-Col";
import dropWrapper from "../components/DropWrapper";
import { data, statuses } from "../data";

export default function WorkPlace() {
    const [items, setItems] = useState(data);
    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);
        setItems(prevState => {
            const newsItems = prevState
                .filter(i => i.id !== item.id)
                .concart({ ...item, status, icon: mapping.icon });
            return [...newItems];
        });
        const moveItem = (dragIndex, hoverIndex) => {
            const item = items[dragIndex];
            setItems(prevState => {
                const newsItems = prevState.find((i, idx) => idx !== dragIndex);
                newItems.splice(hoverIndex, 0, item);
                return [...newItems];
            });
        };
    }
    return (
        <div className={"row"}>
            {statuses.map(s => {
                return (
                    <div key={status} className={"col-wrapper"}>
                        <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                        <dropWrapper onDropp={onDrop} status={s.status}>
                            <Col> {items.filter(i => i.status === s.status).map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s}>

                            </Item>)}
                            </Col>
                        </dropWrapper>
                    </div>
                )
            })}
        </div>
    )
}