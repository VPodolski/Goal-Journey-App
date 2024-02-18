using GoalJourney.Models.Enums;

namespace GoalJourney.Models;

public class GoalModel
{
    public GoalModel(string description)
    {
        Description = description;
    }

    public int Id { get; set; }
    
    public GoalTypes Type { get; set; }
    
    public bool IsDone { get; set; }
    
    public string Description { get; set; }
}