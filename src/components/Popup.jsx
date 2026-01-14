import React from 'react';

const Popup = ({ onClose }) => {
  return (
    <div id="popup" className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="bg-black p-8 rounded shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Weryfikacja uprawnień</h2>
        <p className="mb-4">Witaj, wchodząc na stronę wyrażasz zgodę na zapisywanie plików cookie (zwanych ciastkami) w twojej przeglądarce<br></br>Zgadzasz się również na monitorowanie stanu aktywności twojego przebywania na stronie oraz wyrażasz zgodę na zbieranie danych na temat twojej przeglądarki i systemu w celu optymalizacji lepszego działania naszej strony.</p>
        <button onClick={onClose} className="px-4 py-2 bg-blue-700 text-white rounded">
          Rozumiem
        </button>
      </div>
    </div>
  );
};

export default Popup;