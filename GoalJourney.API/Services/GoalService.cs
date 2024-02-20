using GoalJourney.API.Data;
using GoalJourney.API.Models;
using GoalJourney.API.Services.Interfaces;

namespace GoalJourney.API.Services;

public class GoalService: IGoalService
{
    private readonly GoalDataContext dataContext;

    public GoalService(GoalDataContext dataContext)
    {
        this.dataContext = dataContext;
    }

    public GoalModel Create(GoalModel model)
    {
        var lastGoal = dataContext.Goals.LastOrDefault();

        model.Id = lastGoal != null ? lastGoal.Id + 1 : 1;

        dataContext.Goals.Add(model);

        return model;
    }

    public GoalModel Update(GoalModel model)
    {
        var modelToUpdate = dataContext.Goals.FirstOrDefault(m => m.Id == model.Id);

        if (modelToUpdate == null)
        {
            return Create(model);
        }

        modelToUpdate.Description = model.Description;
        modelToUpdate.Type = model.Type;
        modelToUpdate.IsDone = model.IsDone;

        dataContext.Goals.Remove(modelToUpdate);
        dataContext.Goals.Add(modelToUpdate);
        
        return modelToUpdate;
    }

    public GoalModel? Get(int id)
    {
        return dataContext.Goals.FirstOrDefault(m => m.Id == id);
    }

    public List<GoalModel> Get()
    {
        return dataContext.Goals;
    }

    public void Delete(int id)
    {
        var modelToDelete = dataContext.Goals.FirstOrDefault(m => m.Id == id);
        
        if (modelToDelete != null)
        {
            dataContext.Goals.Remove((modelToDelete));
        }
    }
}