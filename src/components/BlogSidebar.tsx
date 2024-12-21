import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function BlogSidebar() {
  const [email, setEmail] = useState("");

  const upcomingGames = [
    { title: "PS5 Upcoming Games", date: "Dec 15, 2024" },
    { title: "PS5 Upcoming Games", date: "Dec 16, 2024" },
    { title: "PS5 Upcoming Games", date: "Dec 17, 2024" },
    { title: "PS5 Upcoming Games", date: "Dec 18, 2024" },
    { title: "PS5 Upcoming Games", date: "Dec 19, 2024" },
  ];

  return (
    <aside className="space-y-8">
      {/* Advertisement Section */}
      <div className="bg-gray-200 p-4 text-center min-h-[200px] flex items-center justify-center">
        <span className="text-gray-500">Ads Here</span>
      </div>

      {/* Upcoming Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Upcomings</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">Games</Button>
          <Button variant="outline" size="sm">Phone</Button>
          <Button variant="outline" size="sm">Movies</Button>
          <Button variant="outline" size="sm">More</Button>
        </div>
        <div className="space-y-4">
          {upcomingGames.map((game, index) => (
            <div key={index} className="flex gap-3">
              <img
                src="/placeholder.svg"
                alt={game.title}
                className="w-20 h-14 object-cover rounded"
              />
              <div>
                <h4 className="font-medium">{game.title}</h4>
                <p className="text-sm text-gray-500">Coming {game.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advertisement Section */}
      <div className="bg-gray-200 p-4 text-center min-h-[200px] flex items-center justify-center">
        <span className="text-gray-500">Ads Here</span>
      </div>
    </aside>
  );
}