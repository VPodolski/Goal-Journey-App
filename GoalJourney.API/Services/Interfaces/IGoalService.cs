using GoalJourney.API.Models;

namespace GoalJourney.API.Services.Interfaces;

public interface IGoalService
{
    public GoalModel Create(GoalModel model);
    public GoalModel Update(GoalModel model);
    public GoalModel? Get(int id);
    public List<GoalModel> Get();
    public void Delete(int id);
}