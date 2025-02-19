function CharacterCard({ character }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white border-t border-b border-gray-300 cursor-pointer hover:bg-gray-100 transition">
            <img
                src={character.image}
                alt={character.name}
                className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
                <h3 className="font-semibold text-base text-gray-900">{character.name}</h3>
                <p className="text-sm text-gray-600">{character.species}</p>
            </div>
        </div>
    );
}

export default CharacterCard;