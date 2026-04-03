import fs from 'fs/promises';
import path from 'path';
import Navbar from "@/components/Navbar";
import ProjectCatalog from "@/components/ProjectCatalog";
import { getLatestYearWithTeams } from "@/data/years/index";

interface TeamEntry {
    teamNumber: number;
    projectName: string;
    file: string;
    price?: string;
    imageSrc?: string;
    goat?: boolean;
}

export default async function Projects() {
    // Resolve which year's teams data to use
    const yearEntry = getLatestYearWithTeams();
    const teamsDirectory = path.join(process.cwd(), yearEntry?.teamsDir ?? 'data/years/2026/teams_summary');
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
            const logoPath = `/media/2026/logoer/Team-${entry.teamNumber}.png`;

            // Check if app showcase video exists
            const showcaseVideoPath = `/media/2026/app-showcase/Team-${entry.teamNumber}.mp4`;
            const absoluteShowcasePath = path.join(process.cwd(), 'public', showcaseVideoPath);
            let hasShowcase = false;
            try {
                await fs.access(absoluteShowcasePath);
                hasShowcase = true;
            } catch {
                // No showcase video found
            }

            // Always use logo for projects page
            return {
                ...teamData,
                ...entry,
                imageSrc: logoPath, // Always use logo
                promotionalVideo: teamData.promotionalVideo,
                appShowcaseVideo: hasShowcase ? showcaseVideoPath : undefined
            };
        }));
    } catch (error) {
        console.error("Error reading team data:", error);
    }

    // Sort by team number
    teams.sort((a, b) => a.teamNumber - b.teamNumber);

    return (
        <main className="min-h-screen w-full text-white relative">
            <Navbar />

            {/* Background Glow - Matches other pages */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 pt-32 px-4 w-full max-w-7xl mx-auto flex flex-col">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
                    PROJECTS
                </h1>
                <p className="text-xl text-gray-400 mb-12">
                    Explore all 17 innovation projects
                </p>

                <ProjectCatalog projects={teams} />
            </div>
        </main>
    );
}
