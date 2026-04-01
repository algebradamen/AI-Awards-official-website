import Image from "next/image";

export interface TeamData {
    teamNumber: number;
    projectName: string;
    projectType: string; // Used as category
    description: string;
    price?: string; // The award name
    imageSrc?: string; // Path to team image
    goat?: boolean; // If they are the GOAT
    // Add other fields if needed
}

interface WinnerCardProps {
    teamName: string;
    category: string;
    rank: number;
    imageSrc: string;
    className?: string;
    goat?: boolean;
}

const WinnerCard = ({ teamName, category, rank, imageSrc, className = "", goat }: WinnerCardProps) => {
    const isPodium = rank <= 3;

    // Updated Badge Style logic
    const badgeStyle = rank === 1
        ? "bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-[0_0_15px_rgba(234,179,8,0.6)]"
        : rank === 2
            ? "bg-gradient-to-br from-gray-200 to-gray-500 shadow-[0_0_15px_rgba(209,213,219,0.5)]"
            : rank === 3
                ? "bg-gradient-to-br from-amber-400 to-amber-700 shadow-[0_0_15px_rgba(180,83,9,0.5)]"
                : "bg-white/10 border-white/5 text-gray-300 shadow-lg backdrop-blur-md"; // Neutral for others

    return (
        <div className={`relative group rounded-[2.5rem] overflow-hidden border border-white/10 ${className}`}>
            {/* Background Image */}
            <Image
                src={imageSrc}
                alt={teamName}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300"></div>

            {/* Content Container - Always visible */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between transition-opacity duration-300">

                {/* Left: Avatar + Info */}
                <div className="flex items-center gap-4">
                    {/* Rank Circle */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full p-[2px] shrink-0 bg-white/20">
                        <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-sm md:text-base font-bold text-white">
                            {rank}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-lg md:text-xl tracking-wide leading-tight">{teamName}</span>
                            {goat && <span className="text-xl">🐐</span>}
                        </div>
                        <span className="text-gray-400 text-sm md:text-base font-medium">{category}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Winners({ teams = [] }: { teams?: TeamData[] }) {
    // Filter teams that have a price (award) - these are the WINNERS
    const winningTeams = teams
        .filter(t => t.price)
        .sort((a, b) => a.teamNumber - b.teamNumber);

    // Filter teams that DON'T have a price - these are the OTHERS (non-winners)
    const otherTeams = teams
        .filter(t => !t.price)
        .sort((a, b) => a.teamNumber - b.teamNumber);

    // Top 3 for Podium (First 3 from the filtered list)
    const team1 = winningTeams[0];
    const team2 = winningTeams[1];
    const team3 = winningTeams[2];

    // Rest of the winning teams (4th place onwards)
    const restOfWinners = winningTeams.slice(3);

    return (
        <section className="min-h-screen w-full flex flex-col items-start relative overflow-hidden py-2 px-4 md:px-12 xl:px-20 pb-20">
            {/* Title Header matching Frame 6 */}
            <div className="flex flex-col items-start mb-8 w-full">
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-2">
                    AI-AWARDS
                </h1>
                <div className="flex items-center gap-3 text-2xl md:text-3xl font-medium">
                    <span className="bg-gradient-to-r from-[#B2A7E7] via-[#93BBE7] to-[#4D8EC3] bg-clip-text text-transparent font-bold">2026</span>
                    <span className="bg-gradient-to-r from-[#FDAD4D] via-[#FEF974] to-[#E97F41] bg-clip-text text-transparent font-bold">winners</span>
                    <span className="text-2xl">🏆</span>
                </div>
            </div>

            {/* Gallery Grid - Left Big, Right Stacked */}
            <div className="w-full max-w-7xl h-auto md:h-[400px] grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Left Column: 1st Place */}
                <div className="md:col-span-2 h-[300px] md:h-full">
                    {team1 && (
                        <WinnerCard
                            rank={team1.teamNumber}
                            teamName={team1.projectName}
                            category={team1.price || team1.projectType}
                            imageSrc={team1.imageSrc || "/alle-vinner.jpg"}
                            goat={team1.goat}
                            className="w-full h-full"
                        />
                    )}
                </div>

                {/* Right Column: 2nd & 3rd Place */}
                <div className="flex flex-col gap-6 h-auto md:h-full">
                    <div className="h-[250px] md:h-auto md:flex-1">
                        {team2 && (
                            <WinnerCard
                                rank={team2.teamNumber}
                                teamName={team2.projectName}
                                category={team2.price || team2.projectType}
                                imageSrc={team2.imageSrc || "/alle-vinner.jpg"}
                                goat={team2.goat}
                                className="w-full h-full"
                            />
                        )}
                    </div>
                    <div className="h-[250px] md:h-auto md:flex-1">
                        {team3 && (
                            <WinnerCard
                                rank={team3.teamNumber}
                                teamName={team3.projectName}
                                category={team3.price || team3.projectType}
                                imageSrc={team3.imageSrc || "/alle-vinner.jpg"}
                                goat={team3.goat}
                                className="w-full h-full"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Rest of Winners (4th place onwards) */}
            {restOfWinners.length > 0 && (
                <div className="w-full max-w-7xl animate-fade-in-up">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {restOfWinners.map((team) => (
                            <div
                                key={team.teamNumber}
                                className="h-[250px]"
                            >
                                <WinnerCard
                                    rank={team.teamNumber}
                                    teamName={team.projectName}
                                    category={team.price || team.projectType}
                                    imageSrc={team.imageSrc || "/alle-vinner.jpg"}
                                    goat={team.goat}
                                    className="w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Other Teams Section - NON-WINNERS */}
            {otherTeams.length > 0 && (
                <div className="w-full max-w-7xl animate-fade-in-up mt-20">
                    <div className="flex flex-col items-start mb-8 w-full">
                        <div className="flex items-center gap-3 text-xl md:text-2xl font-medium">
                            <span className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent font-bold">2026</span>
                            <span className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent font-bold">Other Participant </span>
                            <span className="text-xl">✨</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {otherTeams.map((team) => (
                            <div
                                key={team.teamNumber}
                                className="h-[250px]"
                            >
                                <WinnerCard
                                    rank={team.teamNumber}
                                    teamName={team.projectName}
                                    category={team.price || team.projectType}
                                    imageSrc={team.imageSrc || "/alle-vinner.jpg"}
                                    goat={team.goat}
                                    className="w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
