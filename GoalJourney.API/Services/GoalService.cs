using GoalJourney.API.Data;
using GoalJourney.API.Models;
using GoalJourney.API.Models.Enums;
using GoalJourney.API.Services.Interfaces;

namespace GoalJourney.API.Services;

public class GoalService: IGoalService
{
    private readonly GoalDataContext dataContext;

    private List<GoalModel> defaultGoals = new List<GoalModel>
    {
        new()
        {
            Id = 1,
            Title = "Goal 1",
            Description = "Goal 1",
            Type = GoalTypes.Daily,
            IsDone = false
        },
        new()
        {
            Id = 2,
            Title = "Goal 2",
            Description = "Goal 2 description",
            Type = GoalTypes.Daily,
            IsDone = false
        },
        new()
        {
            Id = 3,
            Title = "Goal 3",
            Description = "Goal 3 description",
            Type = GoalTypes.Daily,
            IsDone = false
        },
        new()
        {
            Id = 4,
            Title = "Goal 4",
            Description = "Goal 4 description",
            Type = GoalTypes.Daily,
            IsDone = false
        },
        new()
        {
            Id = 5,
            Title = "Goal 5",
            Description = "Goal 5 description",
            Type = GoalTypes.Daily,
            IsDone = false
        }
    };

    public GoalService(GoalDataContext dataContext)
    {
        if (dataContext.Goals.Count == 0)
        {
            dataContext.Goals = defaultGoals;
        }
        
        this.dataContext = dataContext;
    }

    public GoalModel Create(GoalModel model)
    {
        if (model.Id == null)
        {
            var lastGoal = dataContext.Goals.LastOrDefault();
            model.Id = lastGoal != null ? lastGoal.Id + 1 : 1;
        }

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