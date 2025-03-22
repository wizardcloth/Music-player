import { Card } from "@/components/ui/card";
import { useMusicStore } from "@/stores/musicStore"
function Dashboard() {
  const {stats} = useMusicStore();
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-12 my-4 rounded-md">
        <Card>
          <div className="flex items-center gap-4 group rounded-md bg-zinc-800/50 p-3 cursor-pointer relative hover:bg-zinc-600">
            <div className="flex-1">
              <span className="text-xl font-medium">Total Songs</span>
              <p className="text-sm">{stats.totalSongs}</p>
            </div>
          </div>
        </Card> 
        <Card>
          <div className="flex items-center gap-4 group rounded-md bg-zinc-800/50 p-3 cursor-pointer relative hover:bg-zinc-600">
            <div className="flex-1">
              <span className="text-xl font-medium">Total Albums</span>
              <p className="text-sm">{stats.totalAlbums}</p>
            </div>
          </div>
        </Card> 
        <Card>
          <div className="flex items-center gap-4 group rounded-md bg-zinc-800/50 p-3 cursor-pointer relative hover:bg-zinc-600">
            <div className="flex-1">
              <span className="text-xl font-medium">Total Users</span>
              <p className="text-sm">{stats.totalUsers}</p>
            </div>
          </div>
        </Card> 
      </div>     
    </div>
  )
}

export default Dashboard