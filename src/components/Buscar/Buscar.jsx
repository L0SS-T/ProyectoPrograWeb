import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Buscar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/buscar/${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <div className="contenedorBuscar">
      <input
        className="buscar"
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Buscar;