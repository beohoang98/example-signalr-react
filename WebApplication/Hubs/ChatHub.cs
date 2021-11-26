using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace WebApplication.Hubs
{
    [Authorize]
    public class ChatHub : Hub<IChatHub>
    {
        private readonly ILogger _logger;

        public ChatHub(ILogger<ChatHub> logger)
        {
            _logger = logger;
        }

        public override Task OnConnectedAsync()
        {
            _logger.LogInformation("Connected");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            _logger.LogInformation("Disconnected");
            return base.OnDisconnectedAsync(exception);
        }

        [HubMethodName("joined")]
        public async Task NotifyJoin()
        {
            await Clients.Others.Joined(Context.UserIdentifier);
        }

        [HubMethodName("left")]
        public async Task NotifyLeave()
        {
            await Clients.Others.Left(Context.UserIdentifier);
        }

        [HubMethodName("message")]
        public async Task NewMessage(string message)
        {
            var user = Context.UserIdentifier;

            _logger.LogDebug("Message from [{User}]: {Message}", user, message);
            await Clients.All.ReceiveMessage(user, message);
        }
    }
}
