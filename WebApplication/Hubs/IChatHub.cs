using System.Threading.Tasks;

namespace WebApplication.Hubs
{
    public interface IChatHub
    {
        Task ReceiveMessage(string name, string message);
        Task Joined(string name);
        Task Left(string name);
    }
}
