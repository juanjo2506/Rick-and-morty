import { useState, useEffect } from "react";
import CharacterList from "../components/CharacterList";
import CharacterDetail from "../components/CharacterDetail";
import { ArrowLeft } from "lucide-react";

function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">

      <div className={`w-full md:w-1/3 p-4 border-r border-gray-300 ${isMobile && selectedCharacter ? "hidden" : ""} width`}>
        <CharacterList onCharacterSelect={setSelectedCharacter} />
      </div>


      <div className={`w-full md:w-2/3 p-6 relative ${selectedCharacter ? "" : "hidden"}`}>

        {isMobile && selectedCharacter && (
          <button
            onClick={() => setSelectedCharacter(null)}
            className="absolute top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
          >
            <ArrowLeft size={24} />
            <span className="text-lg font-medium">Back</span>
          </button>
        )}

        {selectedCharacter && (
          <div className="mt-10">
            <CharacterDetail character={selectedCharacter} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
