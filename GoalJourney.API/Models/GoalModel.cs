using GoalJourney.API.Models.Enums;

namespace GoalJourney.API.Models;

public class GoalModel
{
    public GoalModel(int id, string title, GoalTypes type, string description)
    {
        Id = id;
        Title = title;
        Description = description;
        Type = type;
        IsDone = false;
    }

    public GoalModel()
    {
        
    }

    public int? Id { get; set; }
    
    public string Title { get; set; }
    
    public GoalTypes Type { get; set; }
    
    public bool IsDone { get; set; }
    
    public string Description { get; set; }
}