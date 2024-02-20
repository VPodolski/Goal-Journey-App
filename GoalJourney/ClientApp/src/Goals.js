import {useEffect, useState} from "react";

const Goals = () => {
    const [allGoals, setGoals] = useState([]);
    const getGoals = async () => {
        
    const response = await fetch("https://localhost:7005/WeatherForecast", {
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
                <p>Goals creating</p>
                <label>Goal Type</label>
                <div>
                    <select>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>
                </div>
                <label>Description</label>
                <div>
                    <textarea />
                </div>
                <button>Add</button>
            </div>
            <div className={"goals-list-area"}>
                
            </div>
        </div>
    )
}

export default Goals;