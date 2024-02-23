import {useEffect, useState} from "react";

const Goals = () => {
    const [allGoals, setGoals] = useState([]);
    const url = "https://localhost:7005/api";
    
    const addGoal = async () => {
        const title = document.querySelector('#title-input').value;
        const description = document.querySelector('#description-textarea').value;
        const type = parseInt(document.querySelector('#type-select').value);
        const newGoal = {
            id: null,
            title: title,
            description: description,
            type: type,
            isDone: false
        }

        const response = await fetch(url+"/Goals", {
            method: "Post",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGoal)
        });

        if (response.ok) {
            const goal = await response.json();
            allGoals.push(goal);
            setGoals(allGoals.slice());
        }
    }

    const getGoals = async () => {
        const response = await fetch(url+"/Goals", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/plain"
            }
        });

        if (response.ok) {
            const goals = await response.json();
            setGoals(goals);

            return goals;
        }

        return [];
    }
    
    useEffect(() => {
        getGoals();
    }, []);
    
    return (
        <div>
            <div className={"goals-creation-area"}>
                <label>Title</label>
                <input id={"title-input"} type={"text"}/>
                <p>Goals creating</p>
                <label>Goal Type</label>
                <div>
                    <select id={"type-select"}>
                        <option value={0}>Daily</option>
                        <option value={1}>Weekly</option>
                        <option value={2}>Monthly</option>
                    </select>
                </div>
                <label>Description</label>
                <div>
                    <textarea id={"description-textarea"}/>
                </div>
                <button onClick={() => addGoal()}>Add</button>
            </div>
            <div className={"goals-list-area"}>
                {allGoals.map(g => 
                    <GoalItem 
                        key={g.id}
                        id={g.id} 
                        title={g.title} 
                        description={g.description} 
                        type={g.type} 
                        isDone={g.isDone}>
                    </GoalItem>)}
            </div>
        </div>
    )
}

export default Goals;

const GoalItem = ({id, title, description, type, isDone}) => {
    return (
        <div id={"goal-id-"+id} className={"goal-type-"+type + " goal-done-"+isDone}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}