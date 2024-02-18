using GoalJourney.Models;
using GoalJourney.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GoalJourney.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GoalsController : ControllerBase
{
    private IGoalService goalService;

    public GoalsController(IGoalService goalService)
    {
        this.goalService = goalService;
    }
    
    [HttpPost]
    public GoalModel Create(GoalModel model)
    {
        return goalService.Create(model);
    }
    
    [HttpPatch]
    public GoalModel Update(GoalModel model)
    {
        return goalService.Update(model);
    }
    
    [HttpGet("{id}")]
    public GoalModel? Get(int id)
    {
        return goalService.Get(id);
    }
    
    [HttpGet]
    public List<GoalModel> GetAll()
    {
        return goalService.Get();
    }
    
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        goalService.Delete(id);

        return Ok();
    }
}