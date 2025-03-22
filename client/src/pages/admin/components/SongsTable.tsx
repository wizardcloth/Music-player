import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/musicStore";
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
	const { songs, isloading, error } = useMusicStore();
	// console.log(songs);
	if (isloading) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-zinc-400'>Loading songs...</div>
			</div>
		);
	}
	if (error) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-zinc-400'>{error}</div>
			</div>
		);
	}
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className='hover:bg-zinc-800/50'>
						<TableHead className="text-left">S.no</TableHead>
						<TableHead className='w-[50px]'></TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Artist</TableHead>
						<TableHead>Release Date</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{songs.map((song, index) => (
						<TableRow key={song._id} className='hover:bg-zinc-800/50'>
							<TableCell>
								{`${index + 1}.`}
							</TableCell>
							<TableCell>
								<img src={song.imageUrl} alt={song.title} className='size-10 rounded-md object-cover' />
							</TableCell>
							<TableCell className='font-medium'>{song.title}</TableCell>
							<TableCell>{song.artist}</TableCell>
							<TableCell>
								<span className='inline-flex items-center gap-1 text-zinc-400'>
									<Calendar className='h-4 w-4' />
									{song.createdAt.split("T")[0]}
								</span>
							</TableCell>

							<TableCell className='text-right'>
								<div className='flex gap-2 justify-end'>
									<Button
										variant={"ghost"}
										size={"sm"}
										className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
									// onClick={() => deleteSong(song._id)}
									>
										<Trash2 className='size-4' />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
export default SongsTable;
