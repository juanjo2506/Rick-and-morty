function CharacterDetail({ character }) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg text-center min-h-[85vh] flex flex-col justify-center">

      <div className="md:hidden">

        <div className="border-t border-gray-300 opacity-50"></div>

        <div className="relative p-6">
          <img
            src={character.image}
            alt={character.name}
            className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
          />
          <div className="absolute bottom-4 right-10 w-8 h-8 bg-white border border-gray-300 flex items-center justify-center rounded-full shadow-md">
            {character.status === "Alive" ? "🟢" : character.status === "Dead" ? "🔴" : "⚪"}
          </div>
        </div>


        <div className="border-b border-gray-300 opacity-50"></div>

        <h2 className="text-2xl font-bold text-gray-900 mt-4">{character.name}</h2>
        <div className="mt-4 text-gray-700 text-lg space-y-2">
          <p>
            <span className="font-semibold text-purple-600">Specie:</span> {character.species}
          </p>
          <p>
            <span className="font-semibold text-purple-600">Status:</span> {character.status}
          </p>
          <p>
            <span className="font-semibold text-purple-600">Genre:</span> {character.gender || "Desconocido"}
          </p>
        </div>
      </div>


      <div className="hidden md:block p-6">
        <div className="relative bg-purple-100 rounded-t-xl p-6">
          <img
            src={character.image}
            alt={character.name}
            className="w-40 h-40 rounded-full mx-auto border-4 border-white shadow-lg"
          />
          <div className="absolute bottom-4 right-10 w-10 h-10 bg-white border border-gray-300 flex items-center justify-center rounded-full shadow-md">
            {character.status === "Alive" ? "🟢" : character.status === "Dead" ? "🔴" : "⚪"}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-4">{character.name}</h2>
        <div className="mt-4 text-gray-700 text-lg space-y-2">
          <p>
            <span className="font-semibold text-purple-600">Specie:</span> {character.species}
          </p>
          <p>
            <span className="font-semibold text-purple-600">Status:</span> {character.status}
          </p>
          <p>
            <span className="font-semibold text-purple-600">Genre:</span> {character.gender || "Desconocido"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
