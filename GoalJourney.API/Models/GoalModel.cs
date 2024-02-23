using GoalJourney.API.Models.Enums;

namespace GoalJourney.API.Models;

public class GoalModel
{
    public GoalModel(string description)
    {
        Description = description;
    }

    public GoalModel()
    {
        
    }

    public int Id { get; set; }
    
    public GoalTypes Type { get; set; }
    
    public bool IsDone { get; set; }
    
    public string Description { get; set; }
}