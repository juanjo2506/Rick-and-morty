import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import CharacterCard from "./CharacterCard";

function CharacterList({ onCharacterSelect }) {
    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [starredCharacters, setStarredCharacters] = useState([]);

    const [tempCharacterFilter, setTempCharacterFilter] = useState("All");
    const [tempSpeciesFilter, setTempSpeciesFilter] = useState("All");

    const [appliedCharacterFilter, setAppliedCharacterFilter] = useState("All");
    const [appliedSpeciesFilter, setAppliedSpeciesFilter] = useState("All");

    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { name: searchTerm },
    });

    if (loading) return <p className="text-center">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    let characters = data?.characters?.results || [];

    characters = characters.filter((char) => {
        const characterFilterPass =
            appliedCharacterFilter === "All" ||
            (appliedCharacterFilter === "Starred" && starredCharacters.includes(char.id)) ||
            (appliedCharacterFilter === "Others" && !starredCharacters.includes(char.id));

        const speciesFilterPass =
            appliedSpeciesFilter === "All" || char.species === appliedSpeciesFilter;

        return characterFilterPass && speciesFilterPass;
    });

    const applyFilters = () => {
        setAppliedCharacterFilter(tempCharacterFilter);
        setAppliedSpeciesFilter(tempSpeciesFilter);
        setShowFilters(false);
    };

    const toggleStarred = (charId) => {
        setStarredCharacters((prev) =>
            prev.includes(charId) ? prev.filter((id) => id !== charId) : [...prev, charId]
        );
    };

    return (
        <div className="p-4 bg-white">
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Search character..."
                    className="flex-grow p-2 border border-purple-400 rounded-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={() => setSearchTerm(search)}
                    className="p-2 bg-purple-500 text-white rounded-md"
                >
                    🔍 Search
                </button>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 bg-purple-500 text-white rounded-md"
                >
                    ⚙️ Filters
                </button>
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
                        Personajes Favoritos ({starredCharacters.length})
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
                Personajes ({characters.length})
            </h2>
            <div className="max-h-[400px] overflow-y-auto">
                <div className="grid grid-cols-1 gap-4 mt-4">
                    {characters.map((char) => (
                        <div key={char.id} className="relative">
                            <div onClick={() => onCharacterSelect(char)}>
                                <CharacterCard character={char} />
                            </div>
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
