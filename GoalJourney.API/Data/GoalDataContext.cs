using GoalJourney.API.Models;

namespace GoalJourney.API.Data;

public class GoalDataContext
{
    public List<GoalModel> Goals { get; set; }

    public GoalDataContext()
    {
        Goals = new List<GoalModel>();
    }
}