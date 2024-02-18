using GoalJourney.Models;

namespace GoalJourney.Data;

public class GoalDataContext
{
    public List<GoalModel> Goals { get; set; }

    public GoalDataContext()
    {
        Goals = new List<GoalModel>();
    }
}