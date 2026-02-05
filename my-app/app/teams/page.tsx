import fs from 'fs/promises';
import path from 'path';
import Navbar from "@/components/Navbar";
import Winners from "@/components/Winners";

interface TeamEntry {
    teamNumber: number;
    projectName: string;
    file: string;
    price?: string;
    goat?: boolean;
    imageSrc?: string;
}

export default async function Teams() {
    // Read index.json to get list of teams
    const teamsDirectory = path.join(process.cwd(), 'teams_summary');
    const indexFilePath = path.join(teamsDirectory, 'index.json');

    let teams = [];

    try {
        const indexData = JSON.parse(await fs.readFile(indexFilePath, 'utf8'));
        const teamEntries: TeamEntry[] = indexData.teams;

        // Read each team's individual JSON file
        teams = await Promise.all(teamEntries.map(async (entry) => {
            const filePath = path.join(teamsDirectory, entry.file);
            const fileContent = await fs.readFile(filePath, 'utf8');
            const teamData = JSON.parse(fileContent);

            // Construct logo path
            const logoPath = `/media/logoer/Team-${entry.teamNumber}.png`;

            // Merge the info from index.json (like price) with the file content
            // If imageSrc is not present (non-winners), use the logo path
            return {
                ...teamData,
                ...entry,
                imageSrc: entry.imageSrc || logoPath
            };
        }));
    } catch (error) {
        console.error("Error reading team data:", error);
        // Fallback or empty array will be handled by Winners component
    }

    return (
        <main className="min-h-screen w-full bg-black text-white relative">
            <Navbar />

            {/* Background Glow - Matches landing page */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 pt-24 px-4 container mx-auto">
                <Winners teams={teams} />
            </div>

        </main>
    );
}
