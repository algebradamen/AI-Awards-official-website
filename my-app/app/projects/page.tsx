import fs from 'fs/promises';
import path from 'path';
import Navbar from "@/components/Navbar";
import ProjectCatalog from "@/components/ProjectCatalog";

interface TeamEntry {
    teamNumber: number;
    projectName: string;
    file: string;
    price?: string;
    imageSrc?: string;
    goat?: boolean;
}

export default async function Projects() {
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

            // Check if app showcase video exists
            const showcaseVideoPath = `/app-showcase/Team-${entry.teamNumber}.mp4`;
            const absoluteShowcasePath = path.join(process.cwd(), 'public', showcaseVideoPath);
            let hasShowcase = false;
            try {
                await fs.access(absoluteShowcasePath);
                hasShowcase = true;
            } catch {
                // No showcase video found
            }

            // Merge the info from index.json (like price, imageSrc) with the file content
            // We verify if logo exists, but here we assume it does based on listing.
            return {
                ...teamData,
                ...entry,
                imageSrc: logoPath,
                promotionalVideo: teamData.promotionalVideo, // Keep original trailer
                appShowcaseVideo: hasShowcase ? showcaseVideoPath : undefined // Add showcase separately
            }; // Use logoPath as imageSrc for projects list
        }));
    } catch (error) {
        console.error("Error reading team data:", error);
    }

    // Sort by team number
    teams.sort((a, b) => a.teamNumber - b.teamNumber);

    return (
        <main className="min-h-screen w-full bg-black text-white relative">
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
