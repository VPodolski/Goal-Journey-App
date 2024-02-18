using GoalJourney.Models;

namespace GoalJourney.Services.Interfaces;

public interface IGoalService
{
    public GoalModel Create(GoalModel model);
    public GoalModel Update(GoalModel model);
    public GoalModel? Get(int id);
    public List<GoalModel> Get();
    public void Delete(int id);
}