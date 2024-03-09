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
            mode: "read",
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

            goals.forEach(function(goal) {
                goal.mode = "read";
            });

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
            setGoals(await getGoals());
        }
    }

    const setEditModeFor = async (goal) =>{
        let index = allGoals.indexOf(goal);

        if (index != null) {
            document.getElementById('type-select-' + goal.id).selectedIndex = goal.type;
            
            goal.mode = "edit";
            allGoals[index] = goal;
            setGoals(allGoals.slice());
        }
    }

    const updateGoal = async (oldGoal) => {
        const title = document.querySelector('#title-input-' + oldGoal.id).value;
        const description = document.querySelector('#description-textarea-' + oldGoal.id).value;
        const type = parseInt(document.querySelector('#type-select-' + oldGoal.id).value);
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
            setGoals(await getGoals());
        }
    }

    useEffect( () => {
        const fetchGoals = async () => {
            setGoals(await getGoals());
        };

        fetchGoals().catch(console.error);
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
                        onEditGoal = {setEditModeFor}
                    >
                    </GoalItem>)}
            </div>
        </div>
    )
}

export default Goals;

const GoalItem = ({goal, onDeleteGoal, onUpdateGoal, onEditGoal}) => {
    return (
        <div id={"goal-id-"+goal.id} className={"goal" + " mode-" + goal.mode + " type-" + goal.type + " done-" + goal.isDone + " alert alert-success"}>
            <div className={"read-mode"}>
                <h3>{goal.title}</h3>
                <div>{goal.description}</div>
                <br/>
                <div className={"button-block"}>
                    <button className={"btn btn-success button-done"}>Done</button>
                    <div className={"right-buttons"}>
                        <button onClick={() => onEditGoal(goal)} className={"btn btn-warning"}>Edit</button>
                        <button onClick={() => onDeleteGoal(goal.id)} className={"btn btn-danger"}>Delete</button>
                    </div>
                </div>
            </div>
            <div className={"edit-mode"}>
                <label htmlFor={"title-input"} className={"form-label"}>Title</label>
                <input id={"title-input-" + goal.id} type={"text"} defaultValue={goal.title} className={"form-control"}/>
                <label htmlFor={"type-select"} className={"form-label"}>Goal Type</label>
                <select id={"type-select-" + goal.id} className={"form-select"}>
                    <option value={0}>Daily</option>
                    <option value={1}>Weekly</option>
                    <option value={2}>Monthly</option>
                </select>
                <label htmlFor={"description-textarea"} className={"form-label"}>Description</label>
                <textarea id={"description-textarea-" + goal.id} className={"form-control"} defaultValue={goal.description}/>
                <br/>
                <div className={"button-block"}>
                    <button onClick={() => onUpdateGoal(goal)} className={"btn btn-success button-done"}>Update</button>
                </div>
            </div>
        </div>
    );
}