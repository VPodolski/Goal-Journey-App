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

    const deleteGoal = async (id) => {
        const response = await fetch(url+"/Goals/"+id, {
            method: "Delete",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/plain"
            }
        });

        if (response.ok) {
             await getGoals();
        }
    }

    const updateGoal = async (oldGoal) => {
        const title = document.querySelector('#title-input').value;
        const description = document.querySelector('#description-textarea').value;
        const type = parseInt(document.querySelector('#type-select').value);
        oldGoal.title = title;
        oldGoal.description = description;
        oldGoal.type = type;

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');

        const options = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(oldGoal)
        };

        const result = await fetch(url+"/Goals", options);
        
        if (result.ok){
            await getGoals();
        }
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
                        goal={g}
                        onDeleteGoal = {deleteGoal}
                        onUpdateGoal = {updateGoal}
                    >
                    </GoalItem>)}
            </div>
        </div>
    )
}

export default Goals;

const GoalItem = ({goal, onDeleteGoal, onUpdateGoal}) => {
    return (
        <div id={"goal-id-"+goal.id} className={"goal-type-"+goal.type + " goal-done-"+goal.isDone}>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <button onClick={() => onUpdateGoal(goal)}>Update</button>
            <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
        </div>
    );
}