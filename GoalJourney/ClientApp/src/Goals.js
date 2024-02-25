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
        <div className={"row align-items-start justify-content-center"}>
            <div className={"goals-creation-area col-4 alert alert-info"}>
                <h2>New goal</h2>
                <label htmlFor={"title-input"} className={"form-label"}>Title</label>
                <input id={"title-input"} type={"text"} className={"form-control"}/>
                <label htmlFor={"type-select"} className={"form-label"}>Goal Type</label>
                <select id={"type-select"} className={"form-select"}>
                    <option value={0}>Daily</option>
                    <option value={1}>Weekly</option>
                    <option value={2}>Monthly</option>
                </select>
                <label htmlFor={"description-textarea"} className={"form-label"}>Description</label>
                <textarea id={"description-textarea"} className={"form-control"}/>
                <br/>
                <div className={"d-grid gap-2 d-md-flex justify-content-md-end"}>
                    <button onClick={() => addGoal()} type={"button"} className={"btn btn-success"}>Add</button>
                </div>
            </div>
            <div className={"goals-list-area col-5"}>
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
        <div id={"goal-id-"+goal.id} className={"goal-type-"+goal.type + " goal-done-"+goal.isDone + " alert alert-success"}>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <div className={"d-grid gap-2 d-md-block"}>
                <button className={"btn btn-success"}>Done</button>
                <button onClick={() => onUpdateGoal(goal)} className={"btn btn-warning"}>Update</button>
                <button onClick={() => onDeleteGoal(goal.id)} className={"btn btn-danger"}>Delete</button>
            </div>
            
        </div>
    );
}