import React, { useState } from "react";
import AfiliadoList from "../components/AfiliadoList";
import AfiliadoForm from "../components/AfiliadoForm";

const Home = () => {
  const [editable, setEditable] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <AfiliadoForm
        editable={editable}
        onSaved={() => {
          setEditable(null);
          setRefresh(!refresh);
        }}
      />
      <AfiliadoList key={refresh} onEdit={setEditable} />
    </div>
  );
};

export default Home;
