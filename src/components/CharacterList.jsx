import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import CharacterCard from "./CharacterCard";
import { Search, Settings } from "lucide-react";

function CharacterList({ onCharacterSelect }) {
    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [starredCharacters, setStarredCharacters] = useState([]);
    const [deletedCharacters, setDeletedCharacters] = useState([]);

    const [tempCharacterFilter, setTempCharacterFilter] = useState("All");
    const [tempSpeciesFilter, setTempSpeciesFilter] = useState("All");
    const [tempGenderFilter, setTempGenderFilter] = useState("All");
    const [tempStatusFilter, setTempStatusFilter] = useState("All");

    const [appliedCharacterFilter, setAppliedCharacterFilter] = useState("All");
    const [appliedSpeciesFilter, setAppliedSpeciesFilter] = useState("All");
    const [appliedGenderFilter, setAppliedGenderFilter] = useState("All");
    const [appliedStatusFilter, setAppliedStatusFilter] = useState("All");

    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { name: searchTerm },
    });

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    let characters = data?.characters?.results || [];

    characters = characters.filter((char) => {
        const characterFilterPass =
            appliedCharacterFilter === "All" ||
            (appliedCharacterFilter === "Starred" && starredCharacters.includes(char.id)) ||
            (appliedCharacterFilter === "Others" && !starredCharacters.includes(char.id));

        const speciesFilterPass = appliedSpeciesFilter === "All" || char.species === appliedSpeciesFilter;
        const genderFilterPass = appliedGenderFilter === "All" || char.gender === appliedGenderFilter;
        const statusFilterPass = appliedStatusFilter === "All" || char.status === appliedStatusFilter;
        const notDeleted = !deletedCharacters.includes(char.id);

        return characterFilterPass && speciesFilterPass && genderFilterPass && statusFilterPass && notDeleted;
    });

    const applyFilters = () => {
        setAppliedCharacterFilter(tempCharacterFilter);
        setAppliedSpeciesFilter(tempSpeciesFilter);
        setAppliedGenderFilter(tempGenderFilter);
        setAppliedStatusFilter(tempStatusFilter);
        setShowFilters(false);
    };

    const toggleStarred = (charId) => {
        setStarredCharacters((prev) =>
            prev.includes(charId) ? prev.filter((id) => id !== charId) : [...prev, charId]
        );
    };

    const softDeleteCharacter = (charId) => {
        setDeletedCharacters((prev) => [...prev, charId]); // Agrega el personaje a la lista de eliminados
    };


    return (
        <div className="p-4 bg-white">
    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2">
    <input
            type="text"
            placeholder="Search character..."
            className="flex-grow p-2 border border-purple-400 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex space-x-2">
        <button
    onClick={() => setSearchTerm(search)}
    className="p-2 bg-purple-500 text-white rounded-md flex items-center space-x-2"
>
    <Search className="w-5 h-5" />
    <span>Search</span>
</button>
<button
    onClick={() => setShowFilters(!showFilters)}
    className="p-2 bg-purple-500 text-white rounded-md flex items-center space-x-2 min-h-[42px]"
>
    <Settings className="w-5 h-5" />
    <span>Filters</span>
</button>
        </div>
    </div>

            {searchTerm && (
                <p className="mt-2 text-purple-600 font-semibold">
                    Results: {characters.length}
                </p>
            )}

            {showFilters && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md border border-purple-400">
                    <h3 className="text-lg font-semibold mb-2 text-purple-700">Filter by:</h3>

                    <div className="mb-4">
                        <p className="font-semibold text-center">Character:</p>
                        <div className="grid grid-cols-3 gap-2">
                            {["All", "Starred", "Others"].map((filter) => (
                                <button
                                    key={filter}
                                    className={`p-2 w-full text-center rounded-md transition ${tempCharacterFilter === filter
                                        ? "bg-purple-700 text-white"
                                        : "bg-white border border-purple-400 text-purple-700 hover:bg-purple-600 hover:text-white"
                                        }`}
                                    onClick={() => setTempCharacterFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text-center">Specie:</p>
                        <div className="grid grid-cols-3 gap-2">
                            {["All", "Human", "Alien"].map((filter) => (
                                <button
                                    key={filter}
                                    className={`p-2 w-full text-center rounded-md transition ${tempSpeciesFilter === filter
                                        ? "bg-purple-700 text-white"
                                        : "bg-white border border-purple-400 text-purple-700 hover:bg-purple-600 hover:text-white"
                                        }`}
                                    onClick={() => setTempSpeciesFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 p-4 bg-gray-100 rounded-md border border-purple-400">
                        <h3 className="text-lg font-semibold mb-2 text-purple-700">Filter by:</h3>
                        <div className="mb-4">
                            <p className="font-semibold text-center">Gender:</p>
                            <div className="grid grid-cols-3 gap-2">
                                {["All", "Male", "Female", "unknown"].map((filter) => (
                                    <button
                                        key={filter}
                                        className={`p-2 w-full text-center rounded-md transition ${tempGenderFilter === filter
                                                ? "bg-purple-700 text-white"
                                                : "bg-white border border-purple-400 text-purple-700 hover:bg-purple-600 hover:text-white"
                                            }`}
                                        onClick={() => setTempGenderFilter(filter)}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold text-center">Status:</p>
                            <div className="grid grid-cols-3 gap-2">
                                {["All", "Alive", "Dead", "unknown"].map((filter) => (
                                    <button
                                        key={filter}
                                        className={`p-2 w-full text-center rounded-md transition ${tempStatusFilter === filter
                                                ? "bg-purple-700 text-white"
                                                : "bg-white border border-purple-400 text-purple-700 hover:bg-purple-600 hover:text-white"
                                            }`}
                                        onClick={() => setTempStatusFilter(filter)}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={applyFilters}
                        className="mt-4 p-2 bg-purple-700 text-white rounded-md w-full"
                    >
                        Filter
                    </button>
                </div>
            )}

            {starredCharacters.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-purple-700">
                        Starred characters ({starredCharacters.length})
                    </h2>
                    <div className="max-h-[400px] overflow-y-auto">
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            {characters
                                .filter((char) => starredCharacters.includes(char.id))
                                .map((char) => (
                                    <div key={char.id} className="relative">
                                        <div onClick={() => onCharacterSelect(char)}>
                                            <CharacterCard character={char} />
                                        </div>
                                        <button onClick={() => softDeleteCharacter(char.id)}
                                            className="absolute top-2 right-14 p-2 bg-red-500 text-white rounded-md">
                                            🗑Del
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleStarred(char.id);
                                            }}
                                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md border border-purple-500"
                                        >
                                            {starredCharacters.includes(char.id) ? "❤️" : "🤍"}
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-lg font-semibold text-purple-700 mt-4">
                Characters ({characters.length})
            </h2>

            
            <div className="max-h-[700px] overflow-y-auto">
                <div className="grid grid-cols-1 gap-4 mt-4">
                    {characters.map((char) => (
                        <div key={char.id} className="relative">
                            <div onClick={() => onCharacterSelect(char)}>
                                <CharacterCard character={char} />
                            </div>
                            <button onClick={() => softDeleteCharacter(char.id)}
                                className="absolute top-2 right-14 p-2 bg-red-500 text-white rounded-md">
                                🗑Del
                            </button>
                            <button
                                onClick={() => toggleStarred(char.id)}
                                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md border border-purple-500"
                            >
                                {starredCharacters.includes(char.id) ? "❤️" : "🤍"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CharacterList;
