using GoalJourney.Models.Enums;

namespace GoalJourney.Models;

public class GoalModel
{
    public int Id { get; set; }
    
    public GoalType Type { get; set; }
    
    public bool IsDone { get; set; }
    
    public string Description { get; set; }
}