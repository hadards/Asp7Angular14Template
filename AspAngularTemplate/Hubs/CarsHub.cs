namespace AspAngularTemplate.Hubs
{
    using AspAngularTemplate.Models;
    using Microsoft.AspNetCore.SignalR;

    public class CarsHub : Hub
    {
        public void StartSendingCarStatus(string id)
        {
            ISingleClientProxy client = Clients.Client(Context.ConnectionId);
            Task.Run(() =>
            {
                Random random = new Random();
                // send message every 2 seconds to client
                while (true)
                {
                    // randomize car state 
                    double randNum = random.NextDouble();
                    string randState = randNum >= 0.5 ? "Enter" : "Exit";
                    client.SendAsync("onCarStatus", new { CarId = id, CarStatus = randState });
                    Thread.Sleep(2000);
                }
            });
        }

    }

}
